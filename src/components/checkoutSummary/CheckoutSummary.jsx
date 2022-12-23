import React, { useEffect } from "react";
import styles from "./checkoutSummary.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "../card/Card";
import { CALCULATE_SUB_TOTAL } from "../../redux/slice/cartSlice";

export const CheckoutSummary = () => {
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (store) => store["cart"]
  );

  return (
    <div>
      <h3>CheckoutSummary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <button>
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Subtotal</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
