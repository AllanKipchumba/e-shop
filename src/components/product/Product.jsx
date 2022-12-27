import React, { useEffect, useState } from "react";
import { FaCogs } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCollection } from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import styles from "./product.module.scss";
import { ProductFilter } from "./productFilter/ProductFilter";
import { ProductList } from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";

export const Product = () => {
  //use the custom hook to fetch data from products collection in firestore
  const { data, isLoading } = useFetchCollection("products");

  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch products to store
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    //dispatch GET_PRICE_RANGE action
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  //access products from redux store
  const { products } = useSelector((store) => store["product"]);

  const toggleFilter = () => setShowFilter(!showFilter);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {!isLoading && <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <>
              <img
                src={spinnerImg}
                alt="Loading..."
                style={{ width: "50px" }}
                className="--center-all"
              />
            </>
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            {" "}
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{!showFilter ? "Show" : "Hide"} filter</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
