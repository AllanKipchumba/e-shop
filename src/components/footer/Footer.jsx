import React from "react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {new Date().getFullYear()} All Rights Reserved
    </div>
  );
};
