import React from "react";
import { Card } from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

export const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form onSubmit={(e) => sendEmail(e)}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>

              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed belaw</p>

              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+254 712 345 678</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>e-shopsupport@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Nairobi, Kenya</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@e-shop</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
