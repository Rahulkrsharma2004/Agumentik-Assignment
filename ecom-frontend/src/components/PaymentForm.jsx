import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const { data } = await axios.post("https://ecommerce-backend-phi-green.vercel.app/api/payment", { amount });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.paymentIntent.status === "succeeded") {
      navigate("/success");
    } else {
      alert("Payment failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <CardElement />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </div>
  );
};

export default PaymentForm;
