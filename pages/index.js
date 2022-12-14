import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddForm from "../components/AddForm";

// import Image from "next/image";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [add, setAdd] = useState(false);

  // console.log("first", admin);

  const showform = (e) => {
    e.stopPropagation();
    setAdd(!add);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Resturent App</title>
        <meta name="description" content="Ghar jaisa khana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && (
        <button className={styles.addProduct} onClick={(e) => showform(e)}>
          Add Product
        </button>
      )}
      <PizzaList pizzaList={pizzaList} />
      {add && <AddForm setAdd={setAdd} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  console.log("mu", myCookie);
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
