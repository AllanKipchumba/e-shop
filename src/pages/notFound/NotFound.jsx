import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>Oops! Page not found</p>
        <button className="--btn">
          <Link to="/">&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};
