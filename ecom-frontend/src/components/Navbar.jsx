import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css"; // Import custom CSS

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="navbar">
      <Link  className="logo">E-Shop</Link>

      <div className="nav-links">
        {/* <Link to="/cart" className="cart-icon">
          🛒 Cart 
          {cart.items.length > 0 && <span className="cart-count">{cart.items.length}</span>}
        </Link> */}
        {user ? (
          <button className="logout-btn">Logout</button>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
