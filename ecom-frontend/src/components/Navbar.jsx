import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import the logout action from your auth slice
import "../styles/Navbar.css"; // Import custom CSS

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">E-Shop</Link>

      <div className="nav-links">
        <Link to="/cart" className="cart-icon">
          🛒 Cart{" "}
          {cart.cartItems.length > 0 && (
            <span className="cart-count">{cart.cartItems.length}</span>
          )}
        </Link>
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
