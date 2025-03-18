import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome to E-Shop</h1>
        <p>Your one-stop shop for amazing products.</p>
        <Link to="/products" className="shop-btn">Shop Now</Link>
      </header>

      <section className="features">
        <div className="feature-box">
          <h2>Fast Delivery</h2>
          <p>Get your orders delivered in record time.</p>
        </div>
        <div className="feature-box">
          <h2>Secure Payments</h2>
          <p>100% safe and secure transactions.</p>
        </div>
        <div className="feature-box">
          <h2>Quality Products</h2>
          <p>Only the best products curated for you.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
