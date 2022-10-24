import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "./../../firebase/config";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";

//re-use jsx
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);
//style active link
const activeLink = ({ isActive }) => isActive && `${styles.active}`;

export const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //create userName from email when user logs in with email and pass
        if (user.displayName == null) {
          //remove @gmail.com from email
          const u1 = user.email.slice(0, -10);

          //convert first char to uppercase and concat with other chars
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          setDisplayName(uName);
        }
        //..

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
      }
    });
  }, []);

  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Sign-out successful.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          >
            {" "}
          </div>

          <ul onClick={hideMenu}>
            {/* only display on mobile */}
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>

            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>
              <a href="#">
                <FaUserCircle size={16} />
                Hi, {displayName}
              </a>
              <NavLink to="/register" className={activeLink}>
                Register
              </NavLink>
              <NavLink to="/order-history" className={activeLink}>
                My Orders
              </NavLink>
              <NavLink to="/" onClick={logoutUser}>
                Logout
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>

        {/* Navigation for mobile */}
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};
