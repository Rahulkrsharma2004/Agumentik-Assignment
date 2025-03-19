import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce-backend-phi-green.vercel.app/api/orders",
          
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <p><strong>Total:</strong> ₹{order.totalPrice}</p>
              <p><strong>Products:</strong> {order.products.length}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
