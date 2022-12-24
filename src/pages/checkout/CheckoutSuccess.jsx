import React from "react";
import { Link } from "react-router-dom";

export const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>CheckoutSuccess</h2>
        <p>Thank you for your purchase</p>
        <br />

        <Link to="order-history">
          <button className="--btn --btn-primary">View order status</button>
        </Link>
      </div>
    </section>
  );
};
