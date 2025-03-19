import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { login } from "../redux/authSlice"; // Import login action
import axios from "axios";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ecommerce-backend-phi-green.vercel.app/api/auth/login",
        { email, password }
      );

      if (response.data.message === "Login successful") {
        alert("Login Successful!");
        localStorage.setItem("token", response.data.token);
        
        // ✅ Dispatch the login action to update Redux state immediately
        dispatch(login(true));

        console.log("User logged in:", response.data.user);

        navigate("/products");
      } else {
        alert(response.data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
