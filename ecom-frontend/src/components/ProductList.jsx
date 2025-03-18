import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/ProductList.css";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-phi-green.vercel.app/api/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        `https://ecommerce-backend-phi-green.vercel.app/api/carts/add/${product._id}`,
        { productId: product._id },{withCredentials: true}
      );

      console.log("Add to cart response:", response.data);

      if (response.data.success) {
        dispatch(addToCart(product)); 
        alert("Item added to cart successfully!");
      } else {
        alert(response.data.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
          <p>{product.description}</p>
          <div className="bottom-section">
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
