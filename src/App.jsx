import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//pages
import { Home, Contact, Login, Register, Reset } from "./pages";
//components
import { Header, Footer } from "./components";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={2000} hideProgressBar={true} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
