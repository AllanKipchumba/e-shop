import React from "react";
import styles from "./Card.module.scss";

export const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};
