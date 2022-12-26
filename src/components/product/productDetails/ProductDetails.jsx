import styles from "./productDetails.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
} from "../../../redux/slice/cartSlice";
import { useFetchDocument } from "../../../customHooks/useFetchDocument";
import { useFetchCollection } from "../../../customHooks/useFetchCollection";
import { Card } from "../../card/Card";
import StarsRating from "react-star-rate";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  // get the product from firestore using the custom hook
  const { fetchedDocument } = useFetchDocument(`products`, id);
  //get reviews from firebase
  const { data: reviews } = useFetchCollection("reviews");

  const filteredReview = reviews.filter((rev) => rev.productID === id);

  useEffect(() => {
    setProduct(fetchedDocument);
  }, [fetchedDocument]);

  //access cartItems from store
  const { cartItems } = useSelector((store) => store["cart"]);

  //access the product from cartItems
  const cart = cartItems.find((cart) => cart.id === id);

  //check if product is already added to cat
  //the fn returns -1 if not
  const isProductAddedToCart = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  //add roduct to cart
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  //decrease cart quantity
  const decreaseCart = () => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>

        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
                <p>{product.description}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>SKU</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {isProductAddedToCart >= 0 && (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}

        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          {filteredReview.length === 0 ? (
            <p>There are no reviews for this product yet</p>
          ) : (
            <>
              {filteredReview.map((Review, index) => {
                const { rate, review, reviewDate, userName } = Review;

                return (
                  <div className={styles.review} key={index}>
                    <StarsRating value={rate} />
                    <p>{review}</p>
                    <span>
                      <b>{reviewDate}</b>
                    </span>
                    <br />
                    <span>
                      by:<b> {userName}</b>
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </Card>
      </div>
    </section>
  );
};
