import React from "react";
import styles from "./product.module.scss";
import { ProductFilter } from "./productFilter/ProductFilter";
import { ProductList } from "./productList/ProductList";

export const Product = () => {
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList />
        </div>
      </div>
    </section>
  );
};
