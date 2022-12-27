import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./Admin.module.scss";
import {
  Navbar,
  ViewProducts,
  AddProduct,
  Orders,
  Home,
  OrderDetails,
} from "../../components";

export const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};
