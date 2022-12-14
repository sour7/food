import React, { useState } from "react";
import styles from "../styles/OrderDetails.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const OrderDetails = ({ total, setCash, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  //   console.log(customer);
  const handleOrder = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.close}>
            <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => setCash(false)}
            />
          </div>
          <h1 className={styles.title}>Pay {total} after Delivery</h1>
          <div className={styles.item}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="enetr full name"
              className={styles.input}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="mob" className={styles.label}>
              Mobile Number
            </label>
            <input
              id="mob"
              type="number"
              placeholder="enetr mobile number"
              className={styles.input}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="add" className={styles.label}>
              address
            </label>
            <textarea
              id="add"
              rows={5}
              type="text"
              placeholder="address..."
              className={styles.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button onClick={handleOrder} className={styles.order}>
            Order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
