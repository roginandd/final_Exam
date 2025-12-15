import React, { useState } from 'react';
import '../css/styles.css';
import Header from '../components/header';
import Marquee from '../components/marquee';
import OrderForm from '../components/input';
import OrderList from '../components/order_list';
import DrinksBanner from '../components/banner';
import Footer from '../components/footer'; // Import the Footer component
import Alert from '../components/alert'; // Import the Alert component

function App() {
  const [orders, setOrders] = useState([]); // Track orders here
  const clerkName = 'Jane Doe';
  const [message, setMessage] = useState('');
  const [totalRegularBill, setTotalRegularBill] = useState(0);
  const [totalDiscountedBill, setTotalDiscountedBill] = useState(0);
  const [status, setStatus] = useState(true);

 
  const addOrder = (order) => {
    setOrders([...orders, order]);

    setTotalRegularBill((prevTotal) => prevTotal + order.price); // Add the price to the regular total
    if (order.discounted) {
      setTotalDiscountedBill((prevTotal) => prevTotal + order.price * 0.95); // Apply a 5% discount if on promo
    }
  
  };

  const handleCloseAlert = () => {
    setMessage('');
};

// const fetchTotal = async () => {
//   try {
//     const response = await axios.get('http://localhost:9090/kopeetearia-api/total-bill');
//     setTotalRegularBill(response.data.data.regularBillTotal);
//     setTotalDiscountedBill(response.data.data.discountedBillTotal);
//   } catch (error) {
//     console.error('Error fetching total:', error);
//     setMessage('Cannot load totals. Something went wrong.');
//     setStatus(false);
//   }
// };
  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Marquee />
      <Alert message={message} onClose={handleCloseAlert} status={status} errorMsg ={true}/>
      <div className="content" style={{ flex: 1 }}> {/* Ensures content takes the remaining space */}
        <DrinksBanner />
        <div className="order-section">
          <OrderForm addOrder={addOrder} 
          setMessage={setMessage} 
          setStatus={setStatus} />
          <OrderList  orders={orders} 
            setOrders={setOrders} 
            clerkName={clerkName} 
            setMessage={setMessage} 
            totalRegularBill={totalRegularBill} 
            totalDiscountedBill={totalDiscountedBill}
            setStatus={setStatus}  
             />
           
        </div>
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;
