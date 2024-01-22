import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/get/products")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="products-container">
      <table id="customers">
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Description</th>
          <th>Category</th>
          <th>Quantity</th>
        </tr>

        {products.map((product) => {
          return (
            <tr>
              <td>{product.id}</td>
              <td>
                <div className="product-info-container">
                  <img src={product.images[0]} />
                  {product.name}
                </div>
              </td>
              <td>{product.description}</td>
              <td>{product.catergory}</td>
              <td>{product.quantity}</td>
            </tr>
          );
        })}
      </table>
      <button 
      className="add-product-btn"
      onClick={()=>{
        navigate('/addProduct')
      }}
      >Add Product +</button>
    </div>
  );
}

export default Products;
