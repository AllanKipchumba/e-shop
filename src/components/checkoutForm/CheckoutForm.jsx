import styles from "./checkoutForm.module.scss";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  // LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Card } from "../card/Card";
import { CheckoutSummary } from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART } from "../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () => {
  // const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const { userID, email: userEmail } = useSelector((store) => store["auth"]);
  const { cartItems, cartTotalAmount } = useSelector((store) => store["cart"]);
  const { shippingAddress } = useSelector((store) => store["checkout"]);

  useEffect(() => {
    //cancel out from the process if tripe has not loaded
    if (!stripe) {
      return;
    }
    //get client secret
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    //cancel out from the process if the client ticket has not loaded
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  //save order to firebase
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      //create a orders collection with the schema of order config
      addDoc(collection(db, "orders"), orderConfig);
      //clear cart
      dispatch(CLEAR_CART());
      toast.success(`Order saved`);
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    //confirm payement
    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        //result can be 1. ok - payement intent // 2. bad -error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("payement succesful");

            //save order to firebase on succesful payement
            saveOrder();
          }
        }
      });
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>

          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>

              <PaymentElement
                id={styles["payment-element"]}
                options={paymentElementOptions}
              />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>

              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};
