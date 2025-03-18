import React from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../utils/stripe";
import PaymentForm from "./PaymentForm";

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={totalAmount} />
    </Elements>
  );
};

export default Checkout;
