import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentForm.css"; 

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    // Check if Stripe has loaded
    if (!stripe || !elements) {
      setError("Stripe is not loaded yet. Please wait a moment.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Send payment amount to backend to create PaymentIntent
      const { data } = await axios.post(
        "https://ecommerce-backend-phi-green.vercel.app/api/payment/create-payment-intent",
        { amount }
      );

      // Confirm card payment with the clientSecret from backend
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.paymentIntent?.status === "succeeded") {
        // Payment succeeded; show a success message and redirect
        setTimeout(() => navigate("/products"), 2000);
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2>Complete Your Payment</h2>
      <div className="card-wrapper">
        <CardElement className="card-element" />
      </div>
      {error && <p className="error">{error}</p>}
      <button
        className="pay-btn"
        onClick={handlePayment}
        disabled={loading || !stripe}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default PaymentForm;
