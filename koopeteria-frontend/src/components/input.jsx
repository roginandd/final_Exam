import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ addOrder, setMessage, setStatus }) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [onPromo, setOnPromo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the order object
      const newOrder = {
        orderName: item,
        price: parseFloat(price), // Ensure price is a number
        isDiscounted: onPromo,
      };

      console.log(`NEW ORDER:${JSON.stringify(newOrder)}`);
      // Make POST request to add the order
      const response = await axios.post(
        "http://localhost:8082/kopeetearia-api/add-order",
        newOrder
      );

      console.log(`ADD ORDER RESPONSE:${JSON.stringify(response)}`);
      if (response.status === 201) {
        addOrder(response.data.data); // Update parent component state
        setMessage(response.data.message); // Use the prop to set message
      } else {
        setMessage(response.data.message); // Set error message
      }
    } catch (error) {
      console.error("Error adding order:", error);
      setMessage("Unable to add order. Something went wrong"); // Set a generic error message
      setStatus(false);
    } finally {
      // Reset form fields
      setItem("");
      setPrice("");
      setOnPromo(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <div className="input-list">
        <table>
          <thead>
            <tr>
              <th>Order Item</th>
              <th>Price</th>
              <th>On 5% Promo?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={item}
                  id="ordName"
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  id="ordPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={onPromo}
                  id="ordDiscounted"
                  onChange={(e) => setOnPromo(e.target.checked)}
                />
              </td>
              <td>
                <button
                  className="button-radial"
                  id="addOrderBtn"
                  type="submit"
                >
                  Place Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default OrderForm;
