import React, { useState } from "react";
import styles from "./productList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

export const ProductList = () => {
  const [grid, setGrid] = useState(true);
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt
            size={24}
            color="orangered"
            onClick={() => setGrid(false)}
          />
          <p>
            <b>10 Products found.</b>
          </p>
        </div>

        {/* search icon */}
        <div>
          <p>Search</p>
        </div>

        {/* sort products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select>
            <option value="latest">latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
    </div>
  );
};
