import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./orderDetails.module.scss";
import { Loader } from "../../components/loader/Loader";
import { useFetchDocument } from "../../customHooks/useFetchDocument";

export const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  //fetch order details from firestore
  const { fetchedDocument } = useFetchDocument(`orders`, id);

  useEffect(() => {
    setOrder(fetchedDocument);
  }, [fetchedDocument]);

  console.log(order);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>OrderDetails</h2>
        <div>
          <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <Loader />
        ) : (
          <>
            <p>
              <b>Order ID</b>
              {order.id}
            </p>
            <p>
              <b>Order Amount</b>
              {order.orderAmount}
            </p>
            <p>
              <b>Order Status</b>
              {order.orderStatus}
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
                  <th>Action</th>
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
                      <td className={styles.icons}>
                        <button className="--btn --btn-primary">
                          <Link to={`/review-product/${id}`}>
                            Review Product
                          </Link>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};
