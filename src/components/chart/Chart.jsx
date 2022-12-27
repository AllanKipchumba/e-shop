import React from "react";
import { Card } from "../card/Card";
import styles from "./chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Placed Orders", "Processing", "Shipped", "Delivered"];

//Chart component
export const Chart = () => {
  //get orders from redux store
  const { orderHistory: orders } = useSelector((store) => store["orders"]);

  //create a new array of order status
  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    return array.push(orderStatus);
  });

  //--------------GET ORDER STATUS COUNT----------
  const getOrderCount = (arr, value) => {
    return arr.filter((arrItems) => arrItems === value).length;
  };
  //------------------

  //array destructuring syntax
  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);

  const data = {
    labels,
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
        <h3>Order status chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};
