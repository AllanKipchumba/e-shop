import React, { useEffect } from "react";
import { Product } from "../../components/product/Product";
import { Slider } from "../../components/slider/Slider";

export const Home = () => {
  //scroll back to product page
  //access the url
  const url = window.location.href;
  const scrollToProducts = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  };
  useEffect(() => {
    scrollToProducts();
  }, []);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};
