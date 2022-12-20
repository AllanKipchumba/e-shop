import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCollection } from "../../customHooks/useFetchCollection";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import { Loader } from "../loader/Loader";
import styles from "./product.module.scss";
import { ProductFilter } from "./productFilter/ProductFilter";
import { ProductList } from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";

export const Product = () => {
  //use the custom hook to fetch data from products collection in firestore
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
