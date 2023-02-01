import React, { useState } from "react";
import styles from "./Auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Card } from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader/Loader";
import { useSelector } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { previousURL } = useSelector((store) => store["cart"]);
  //manage user Redirect
  const redirectUser = () => {
    previousURL.includes("cart") ? navigate("/cart") : navigate("/");
  };

  //sign in user with email and password
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        setIsLoading(false);
        redirectUser();
        toast.success("Login Succesful...");

        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  //sign in user with gogle
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Succesfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>

              <div className={styles.links}>
                <Link to="/reset">Forgot password?</Link>
              </div>
              <p>-- or --</p>
            </form>

            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              {" "}
              <FaGoogle color="#fff" /> Login with Google
            </button>

            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};
