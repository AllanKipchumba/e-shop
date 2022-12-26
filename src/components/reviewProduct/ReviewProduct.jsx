import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { Card } from "../card/Card";
import styles from "./reviewProduct.module.scss";

export const ReviewProduct = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();

  const { products } = useSelector((store) => store["product"]);
  const { userID, userName } = useSelector((store) => store["auth"]);

  const product = products.find((item) => item.id === id);

  const submitReview = (e) => {
    e.preventDefault();
    console.log(rate, review);
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>ReviewProduct</h2>
        <p>
          <b>Product name:</b> {product.name}
        </p>
        <img
          src={product.imageURL}
          alt={product.name}
          style={{ width: "100px" }}
        />

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              row="30"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};
