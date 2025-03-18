import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://ecommerce-backend-phi-green.vercel.app/api/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div className="product-container">
      {products.map(product => (
        <div key={product._id} className="product-card">
            <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
            <p>{product.description}</p>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
