import React, { useState } from "react";
import { Card } from "../../card/Card";
import { Loader } from "../../loader/Loader";
import styles from "./changeOrderStatus.module.scss";

export const ChangeOrderStatus = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = () => {};

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>ChangeOrderStatus</h4>
          <form onSubmit={(e) => editOrder(e)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  --Choose one--
                </option>
                <option value="order placed...">Order placed</option>
                <option value="processing...">Processing</option>
                <option value="shipped...">Shipped</option>
                <option value="delivered">Delivered</option>
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
