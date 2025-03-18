import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Cart.css"; // Import the stylesheet
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get("https://ecommerce-backend-phi-green.vercel.app/api/carts/");
        setCartItems(res.data.myCart || []);
      } catch (error) {
        console.error("Error fetching cart items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {loading ? (
        <div className="cart-skeleton">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="cart-item">
              <Skeleton height={80} width={80} />
              <div className="cart-details">
                <Skeleton width={150} height={20} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
          ))}
        </div>
      ) : cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 😞</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            {user ? (
              <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
            ) : (
              <Link to="/login" className="login-btn">Login to Checkout</Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
