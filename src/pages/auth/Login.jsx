import React from "react";
import styles from "./Auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400" />
      </div>

      <div className={styles.form}>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="email" required />
          <input type="password" placeholder="password" required />
          <button className="--btn --btn-primary --btn-block">Login</button>

          <div className={styles.links}>
            <Link to="/reset">Forgot password?</Link>
          </div>

          <p>-- or --</p>
        </form>

        <button className="--btn --btn-danger --btn-block">
          {" "}
          <FaGoogle color="#fff" /> Login with Google
        </button>
        <span className={styles.register}>
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </section>
  );
};
