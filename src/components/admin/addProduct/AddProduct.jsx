import React, { useState } from "react";
import styles from "./addProduct.module.scss";
import { Card } from "../../card/Card";

//categories to be provided as options in select input field
const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

export const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: null,
    category: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //update state
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = () => {};

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card className={styles.card}>
        <form onSubmit={addProduct}>
          {/* Product name */}
          <label>Product name:</label>
          <input
            type="text"
            placeholder="Product name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          {/* product image */}
          <label>Product image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              placeholder="product image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              // required
              placeholder="image URL"
              name="imageURL"
              value={product.imageURL}
              disabled
            />
          </Card>

          {/* product price */}
          <label>Product price:</label>
          <input
            type="number"
            placeholder="Product price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          {/* product category */}
          <label>Product category:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>

          {/* product brand */}
          <label>Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product name"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />

          {/* product description */}
          <label>Product description:</label>
          <textarea
            type="text"
            name="description"
            value={product.description}
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>

          <button className="--btn --btn-primary">Save Product</button>
        </form>
      </Card>
    </div>
  );
};
