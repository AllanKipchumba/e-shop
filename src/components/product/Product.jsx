import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCollection } from "../../customHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import { Loader } from "../loader/Loader";
import styles from "./product.module.scss";
import { ProductFilter } from "./productFilter/ProductFilter";
import { ProductList } from "./productList/ProductList";
// import spinnerImg from "../../assets/spinner.jpg";

export const Product = () => {
  //use the custom hook to fetch data from products collection in firestore
  const { data, isLoading } = useFetchCollection("products");

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

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
          {!isLoading && <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <>
              {/* <img
              src={spinnerImg}
              alt="Loading..."
              style={{ width: "50px" }}
              className="--center-all"
            /> */}
              <Loader />
            </>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  );
};
