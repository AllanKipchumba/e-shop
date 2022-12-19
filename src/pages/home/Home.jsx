import React from "react";
import { Product } from "../../components/product/Product";
import { Slider } from "../../components/slider/Slider";

export const Home = () => {
  const url = window.location.href;
  console.log(url);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};
