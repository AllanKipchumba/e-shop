import React from "react";
import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";
import { createPortal } from "react-dom";

export const Loader = () => {
  //react portal > renders this component outside the parent DOM node
  //it makes the component to cover all other components
  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading...." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};
