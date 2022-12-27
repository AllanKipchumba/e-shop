import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchDocument } from "../../../customHooks/useFetchDocument";
import styles from "./orderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";

export const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  //order id
  const { id } = useParams();

  //fetch the details of the order from firestore
  const { fetchedDocument } = useFetchDocument(`orders`, id);

  useEffect(() => {
    setOrder(fetchedDocument);
  }, [fetchedDocument]);

  const { line1, line2, city, state, country } = order.shippingAddress;
  console.log(order);
  return (
    <>
      <div className={styles.table}>
        <h2>Order Details</h2>
        <div>
          <Link to="/admin/orders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "100px" }} />
        ) : (
          <>
            <p>
              <b>Order ID: </b>

              {order.id}
            </p>
            <p>
              <b>Order Amount: </b>${order.orderAmount}
            </p>
            <p>
              <b>Order Status: </b>
              {order.orderStatus}
            </p>
            <p>
              <b>Shipping Address: </b>
              <br />
              Address: {line1}, {line2}, {city}
              <br />
              State: {state}
              <br />
              Country: {country}
            </p>

            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;

                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>${price}</td>
                      <td>
                        <b>{cartQuantity}</b>
                      </td>
                      <td>${(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};
