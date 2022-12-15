import React, { useEffect } from "react";
import styles from "./navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Navbar = () => {
  //get username from redux store
  const { userName } = useSelector((store) => store["auth"]);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        {userName}
      </div>
      <nav></nav>
    </div>
  );
};
