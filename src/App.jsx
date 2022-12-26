import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import pages
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  Admin,
  Cart,
  CheckoutDetails,
  Checkout,
  CheckoutSuccess,
  OrderHistory,
  OrderDetails,
} from "./pages";

//import components
import {
  Header,
  Footer,
  AdminOnlyRoute,
  ProductDetails,
  ReviewProduct,
} from "./components";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
