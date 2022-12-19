import React, { useState } from "react";
import styles from "./productList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { Search } from "../../search/Search";
import { ProductItem } from "../productItem/ProductItem";

export const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

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
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
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

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  {/* ...product passes all the properties of product to the child component */}
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
