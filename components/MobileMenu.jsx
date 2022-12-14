import React, { useState } from "react";
import styles from "../styles/MobileMenu.module.css";
import Link from "next/link";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={styles.hamburger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <ul className={styles.menu}>
          <li className={styles.menuItem}>Product</li>
          <li className={styles.menuItem}>Menu</li>
          <li className={styles.menuItem}>Events</li>
          <li className={styles.menuItem}>Blogs</li>
          <li className={styles.menuItem}>
            Contects: <br />
            797 992 7512
          </li>
        </ul>
      )}
    </div>
  );
};

export default MobileMenu;
