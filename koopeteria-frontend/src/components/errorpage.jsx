import React, { useState } from 'react';
import '../css/styles.css';
import Header from '../components/header';
import Footer from '../components/footer'; // Import the Footer component
import Alert from '../components/alert'; // Import the Alert component
import ErrorPageContent from './error-page-content';
import Marquee from './marquee';

function ErrorPage() {
  const [message, setMessage] = useState("Unsupported web page URL."); // Use state to manage message visibility
  const [showAlert, setShowAlert] = useState(true); // Manage alert visibility
 

  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert when the button is clicked
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Marquee />
      {showAlert && <Alert message={message} onClose={handleCloseAlert} status={false} errorMsg ={false}/>} {/* Show alert conditionally */}
      <ErrorPageContent />
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default ErrorPage;
