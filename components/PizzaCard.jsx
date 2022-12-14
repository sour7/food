import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/PizzaCard.module.css";
const PizzaCard = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} style={{ textDecoration: "none" }}>
        <Image src={pizza.img} width={200} height={200} alt="" />
      </Link>
      <Link href={`/product/${pizza._id}`} style={{ textDecoration: "none" }}>
        <h1 className={styles.title}>{pizza.title}</h1>{" "}
      </Link>
      <span className={styles.price}>₹ {pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
