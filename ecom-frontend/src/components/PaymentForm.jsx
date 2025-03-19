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
    if (!stripe || !elements) {
      setError("Stripe is not loaded yet. Please wait a moment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Create PaymentIntent
      const { data } = await axios.post(
        "https://ecommerce-backend-phi-green.vercel.app/api/payment/create-payment-intent",
        { amount }
      );

      console.log("PaymentIntent data:", data);

      // 2️⃣ Confirm Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      console.log("Payment result:", result);

      if (result.paymentIntent?.status === "succeeded") {
        const token = localStorage.getItem("token");
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        const orderData = {
          products: cartItems,
          totalPrice: amount,
        };

        await axios.post(
          "https://ecommerce-backend-phi-green.vercel.app/api/orders/add",
          orderData,{withCredentials: true}
          
        );

        navigate("/success");
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
