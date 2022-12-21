import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
} from "../../../redux/slice/filterSlice";
import styles from "./productFilter.module.scss";

export const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  //get products from redux store
  const { products } = useSelector((store) => store["product"]);

  //create an array of categories
  const allCategories = [
    "All",
    //look into all products and pick out unique caregories
    ...new Set(products.map((product) => product.category)),
  ];

  //create an array of brands
  const allBrands = [
    "All",
    //look into all products and pick out unique brands
    ...new Set(products.map((product) => product.brand)),
  ];

  const dispatch = useDispatch();

  //dispatch action to filter products by category
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  //dispatch action to filter products by brand
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat && `${styles.active}`}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>

      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>

        <h4>Price</h4>
        <p>1500</p>
        <div className={styles.price}>
          <input type="range" name="price" min="100" max="1000" />
        </div>
      </div>
      <br />
      <button className="--btn --btn-danger">Clear filter</button>
    </div>
  );
};
