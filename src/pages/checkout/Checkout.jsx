import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import { CheckoutForm } from "../../components/checkoutForm/CheckoutForm";

//test public api key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export const Checkout = () => {
  const [message, setMessage] = useState("Initializing Checkout...");
  const [clientSecret, setClientSecret] = useState("");

  //access variables from store
  const { cartItems, cartTotalAmount: totalAmount } = useSelector(
    (store) => store["cart"]
  );
  const { email: customerEmail } = useSelector((store) => store["auth"]);
  const { shippingAddress, billingAddress } = useSelector(
    (store) => store["checkout"]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eshop payement: email: ${customerEmail}, Amount: ${totalAmount}`;

  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Failed to initialize checkout");
        toast.error(`Something went wrong!!!`);
      });
  }, [billingAddress, shippingAddress, cartItems, description, customerEmail]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
