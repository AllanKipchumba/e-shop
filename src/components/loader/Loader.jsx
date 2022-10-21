import React from "react";
import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";
import { ReactDOM } from "react-dom";

export const Loader = () => {
  //react portal > renders this component outside the parent DOM node
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading...." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};
