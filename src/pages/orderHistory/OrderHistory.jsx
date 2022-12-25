import React from "react";
import { useFetchCollection } from "../../customHooks/useFetchCollection";
import styles from "./OrderHistory.module.scss";

export const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  console.log(data);

  return (
    <div>
      <h2>OrderHistory</h2>
    </div>
  );
};
