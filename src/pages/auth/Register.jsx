import React, { useState } from "react";
import styles from "./Auth.module.scss";
import registerStyles from "./register.module.scss";
import registerImg from "../../assets/register.png";
import { Card } from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Loader } from "./../../components/loader/Loader";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { FaCheck } from "react-icons/fa";

export const Register = () => {
  //input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = (e) => {
    e.preventDefault();

    // password !== confirmPassword && toast("Passwords do not match...!");
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast(error.message);
        // ..
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className={registerStyles.password}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={registerStyles.icon}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size="18" />
                  ) : (
                    <AiOutlineEye size="18" />
                  )}
                </span>
              </div>
              {/* <input
                type="password"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              /> */}

              <button className="--btn --btn-primary --btn-block" type="submit">
                Register
              </button>

              {/* PASSWORD STRENGTH INDICATOR */}
              <div className={registerStyles["password-strength"]}>
                <ul>
                  <p>Password Strength Indicator</p>
                  <li>
                    <span>
                      <GoPrimitiveDot />
                      &nbsp; &nbsp; &nbsp; Lowercase & Uppercase
                    </span>
                  </li>
                  <li>
                    <span>
                      <GoPrimitiveDot />
                      &nbsp; &nbsp; &nbsp; Numbers (0-9)
                    </span>
                  </li>
                  <li>
                    <span>
                      <GoPrimitiveDot />
                      &nbsp; &nbsp; &nbsp; Special Character (!@#$%^&*)
                    </span>
                  </li>
                  <li>
                    <span>
                      <GoPrimitiveDot />
                      &nbsp; &nbsp; &nbsp; At least 8 characters
                    </span>
                  </li>
                </ul>
              </div>
            </form>

            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width="400" />
        </div>
      </section>
    </>
  );
};
