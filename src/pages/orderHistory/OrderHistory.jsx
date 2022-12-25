import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import { useFetchCollection } from "../../customHooks/useFetchCollection";
import { STORE_ORDERS } from "../../redux/slice/orderSlice";
import styles from "./OrderHistory.module.scss";

export const OrderHistory = () => {
  //fetch orders from firebase
  const { data, isLoading } = useFetchCollection("orders");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  //access orders && user id from redux
  const { orderHistory: orders } = useSelector((store) => store["orders"]);
  const { userID } = useSelector((store) => store["auth"]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  //filter ordes by userID
  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Order Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}

          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;

                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>{`$${orderAmount}`}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};
