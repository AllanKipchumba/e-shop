import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { Card } from "../../card/Card";
import { Loader } from "../../loader/Loader";
import styles from "./changeOrderStatus.module.scss";

export const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //OPDATE ORDER STATUS
  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      userID,
      userEmail,
      orderDate,
      orderAmount,
      orderTime,
      cartItems,
      shippingAddress,
      createdAt,
    } = order;
    const orderConfig = {
      userID,
      userEmail,
      orderDate,
      orderTime,
      orderAmount,
      orderStatus: status,
      cartItems,
      shippingAddress,
      createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      //update a specific order of {id} with the schema of order config
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success(`Order status succesfully changed`);
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>ChangeOrderStatus</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  --Choose one--
                </option>
                <option value="Order placed...">Order placed</option>
                <option value="Processing...">Processing</option>
                <option value="Shipped...">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};
