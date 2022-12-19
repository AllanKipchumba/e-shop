import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../card/Card";
import styles from "./productItem.module.scss";

export const ProductItem = ({
  product,
  grid,
  id,
  name,
  price,
  imageURL,
  description,
}) => {
  //shorten characters dynamically - product name and description
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>

        {!grid && (
          <p className={styles.descripton}>{shortenText(description, 200)}</p>
        )}

        <button className="--btn --btn-danger">Add to Cart</button>
      </div>
    </Card>
  );
};
