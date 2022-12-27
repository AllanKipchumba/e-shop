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

const placed = 2;
const processing = 2;
const shipped = 2;
const delivered = 2;

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

export const Chart = () => {
  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
        <h3>Order status chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};
