import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderList = ({ orders, setOrders, clerkName, setMessage, setStatus }) => {
  const [totalRegular, setTotalRegular] = useState(0);
  const [totalDiscounted, setTotalDiscounted] = useState(0);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({
    orderName: "",
    price: "",
    isDiscounted: false,
  });
  const [isLoaded, setIsLoaded] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/kopeetearia-api/orders"
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage("Cannot load details. Something went wrong.");
      setStatus(false);
      setIsLoaded(false);
    }
  };

  const fetchTotal = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/kopeetearia-api/total-bill"
      );
      setTotalRegular(response.data.regularBillTotal);
      setTotalDiscounted(response.data.discountedBillTotal);
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isDiscounted") {
      const updatedDiscounted = checked;
      setUpdatedOrder((prevOrder) => ({
        ...prevOrder,
        isDiscounted: updatedDiscounted,
      }));

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === editingOrderId
            ? { ...order, discounted: updatedDiscounted }
            : order
        )
      );
    } else {
      setUpdatedOrder((prevOrder) => ({
        ...prevOrder,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const startEditing = (order) => {
    setEditingOrderId(order.id);
    setUpdatedOrder({
      orderName: order.orderName,
      price: order.price,
      isDiscounted: order.discounted,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8082/kopeetearia-api/update/${id}`,
        {
          orderName: updatedOrder.orderName,
          price: updatedOrder.price,
          discounted: updatedOrder.isDiscounted,
        }
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        setEditingOrderId(null);

        const updatedOrders = orders.map((order) =>
          order.id === id ? { ...order, ...updatedOrder } : order
        );
        setOrders(updatedOrders);
        fetchTotal(); // Recalculate totals after update
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setMessage("Unable to update order. Something went wrong.");
      setStatus(false);
    }
  };

  const cancelEdit = () => {
    setEditingOrderId(null);
    setUpdatedOrder({ orderName: "", price: "", isDiscounted: false });
  };

  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/kopeetearia-api/delete/${id}`
      );
      if (response.status === 204) {
        setMessage("Deleted Successfully");
        setOrders(orders.filter((order) => order.id !== id));
        fetchTotal(); // Recalculate totals after deletion
      } else {
        setMessage("Unable to delete order. Something went wrong.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      setMessage("Unable to delete order. Something went wrong.");
      setStatus(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTotal();

    console.log(`ORDERS IN USE EFFECT: ${JSON.stringify(orders)}`);
  }, [orders.length]);

  return (
    <div className="order-list">
      {isLoaded ? (
        <table>
          <thead>
            <tr>
              <th colSpan="4">Attending Clerk: {clerkName}</th>
            </tr>
            <tr className="th-2">
              <th>Order Item</th>
              <th>Price</th>
              <th>On 5% Promo?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={index % 2 !== 0 ? "even-row" : "odd-row"}
              >
                <td className={editingOrderId === order.id ? "editing" : ""}>
                  {editingOrderId === order.id ? (
                    <input
                      type="text"
                      name="orderName"
                      id="updName"
                      value={updatedOrder.orderName}
                      onChange={handleInputChange}
                      // onFocus={(e) => e.target.select()}
                    />
                  ) : (
                    order.orderName
                  )}
                </td>
                <td className={editingOrderId === order.id ? "editing" : ""}>
                  {editingOrderId === order.id ? (
                    <input
                      type="number"
                      name="price"
                      id="updPrice"
                      value={updatedOrder.price}
                      onChange={handleInputChange}
                      onFocus={(e) => e.target.select()}
                    />
                  ) : (
                    order.price
                  )}
                </td>
                <td className={editingOrderId === order.id ? "editing" : ""}>
                  {editingOrderId === order.id ? (
                    <input
                      type="checkbox"
                      name="isDiscounted"
                      id="updDiscount"
                      checked={updatedOrder.isDiscounted}
                      onChange={handleInputChange}
                    />
                  ) : order.isDiscounted ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className={editingOrderId === order.id ? "editing" : ""}>
                  {editingOrderId === order.id ? (
                    <>
                      <button
                        id="updOrd"
                        className="order-list-button"
                        onClick={() => handleUpdate(order.id)}
                      >
                        Update
                      </button>
                      <span className="button-separator">|</span>
                      <button
                        id="cancelEdit"
                        className="order-list-button"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        id="editOrd"
                        className="order-list-button"
                        onClick={() => startEditing(order)}
                      >
                        Edit
                      </button>
                      <span className="button-separator">|</span>
                      <button
                        id="deleteOrd"
                        className="order-list-button"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            <tr className={editingOrderId ? "editing" : ""}>
              <td colSpan="4">
                Total Regular Bill: <b>${totalRegular.toFixed(2)}</b>
              </td>
            </tr>
            <tr className={editingOrderId ? "" : "editing"}>
              <td colSpan="4">
                Total Discounted Bill: <b>${totalDiscounted.toFixed(2)}</b>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p></p> // Show error message or empty state if data fails to load
      )}
    </div>
  );
};

export default OrderList;
