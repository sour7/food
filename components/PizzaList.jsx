import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  // console.log("first1", pizzaList);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BEST PIZZA IN UNIVERSE</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit
        accusamus sit officiis? Enim quibusdam quas deserunt? Commodi corrupti
        quod dolores libero hic dignissimos fuga aut velit laboriosam omnis
        aspernatur, eius eaque in itaque tenetur!
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
