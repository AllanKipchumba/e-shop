import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import styles from "./productFilter.module.scss";

export const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);

  //get products from redux store
  const { products } = useSelector((store) => store["product"]);
  //get min and max product price from store
  const { minPrice, maxPrice } = useSelector((store) => store["product"]);

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

  // filter products by category
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  //filter products by brand
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  //filter products by price
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const clearFilers = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

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
        <p>{`${price}`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilers}>
        Clear filter
      </button>
    </div>
  );
};
