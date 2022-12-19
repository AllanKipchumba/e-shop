import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCollection } from "../../customHooks/useFetchCollection";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import styles from "./product.module.scss";
import { ProductFilter } from "./productFilter/ProductFilter";
import { ProductList } from "./productList/ProductList";

const { log } = console;

export const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const { products } = useSelector((store) => store["product"]);
  // log(products);

  const dispatch = useDispatch();
  //dispatch products to redux
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
};
