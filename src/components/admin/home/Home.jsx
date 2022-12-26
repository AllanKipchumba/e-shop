import React, { useEffect } from "react";
import { InfoBox } from "../../index";
import styles from "./home.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCollection } from "../../../customHooks/useFetchCollection";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";
import {
  CALC_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";

//icons
const earningsIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

export const Home = () => {
  //access products and orders from firestore
  const { data: firebaseProducts } = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  //dispatch actions to store products and orders in redux and to calculate the total order amount
  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: firebaseProducts }));
    dispatch(STORE_ORDERS(data));
    dispatch(CALC_TOTAL_ORDER_AMOUNT());
  }, [dispatch, firebaseProducts, data]);

  //access products and orders from redux store
  const { products } = useSelector((store) => store["product"]);
  const { orderHistory: orders, totalOrderAmount } = useSelector(
    (store) => store["orders"]
  );

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningsIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={`Products`}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
    </div>
  );
};
