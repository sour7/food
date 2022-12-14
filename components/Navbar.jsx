import Image from "next/image";
import React from "react";
import styles from "../styles/Navbar.module.css";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const cartQty = useSelector((state) => state.cart.cartQty);
  const cartData = useSelector((state) => state);
  // console.log("cart", cartData);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <Link href={"/npm"}>
          <div className={styles.compayname}>LICORICE PIZZA</div>
        </Link>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>789 654 4785</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href={"/"}>
            <li className={styles.listItem}>Homepage</li>{" "}
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" width={180} height={70} alt="" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href={"/cart"}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{cartQty}</div>
          </div>
        </Link>
        <div className={styles.mobileView}>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
