import React from "react";
import { Link } from "react-router-dom";

export const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>CheckoutSuccess</h2>
        <p>Thank you for your purchase</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/order-history"> View order status</Link>
        </button>
      </div>
    </section>
  );
};
