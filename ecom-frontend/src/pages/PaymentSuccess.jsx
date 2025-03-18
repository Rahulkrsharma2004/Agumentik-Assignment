import React from "react";
import { Link } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-box">
        <h1>🎉 Payment Successful! 🎉</h1>
        <p>Thank you for your purchase. Your order is on its way!</p>
        <Link to="/orders" className="order-btn">View Orders</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
