import React, { useState } from "react";
import { Card } from "../../components/card/Card";
import styles from "./checkoutDetails.module.scss";
import { CountryDropdown } from "react-country-region-selector";

const initialAddress = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

export const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddress });
  const [billing, setBilling] = useState({ ...initialAddress });

  const handleShipping = () => {};
  const handleBilling = () => {};
  const handleSubmit = () => {};

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>

              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />

              <label>Address line1</label>
              <input
                type="text"
                placeholder="Address line1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />

              <label>Address line2</label>
              <input
                type="text"
                placeholder="Address line2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />

              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />

              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />

              <label>Postal_code</label>
              <input
                type="text"
                placeholder="Postal_code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />

              {/* country input */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />

              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};
