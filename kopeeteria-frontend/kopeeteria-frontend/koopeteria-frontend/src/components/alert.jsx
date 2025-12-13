import React from 'react';
import '../css/styles.css'; // Ensure the path is correct

const Alert = ({ message, onClose, status, errorMsg }) => {
    if (!message) return null; // Don't render if there's no message
    
    const alertClass = status ? 'alert success' : 'alert error'; // Set the alert class based on status

    return (
        <div className={alertClass}>
            <span>{message}</span>
            {/* Conditionally render the close button based on errorMsg */}
            {errorMsg === true && ( // Use && for conditional rendering
                <button onClick={onClose} className="alert-close">x</button>
            )}
        </div>
    );
};

export default Alert;
