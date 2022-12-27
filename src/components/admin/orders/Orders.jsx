import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchCollection } from "../../../customHooks/useFetchCollection";
import { STORE_ORDERS } from "../../../redux/slice/orderSlice";
import { Loader } from "../../loader/Loader";
import styles from "./orders.module.scss";

export const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fetch orders from firebase
  const { data, isLoading } = useFetchCollection("orders");
  //save orders to redux
  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  //access orders from redux
  const { orderHistory: orders } = useSelector((store) => store["orders"]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={`${styles.order}`}>
        <h2>Orders</h2>
        <p>
          Open an order to leave a <b>Change order Status</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}

          <div className={styles.table}>
            {orders.length === 0 ? (
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
                  {orders.map((order, index) => {
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
    </>
  );
};
