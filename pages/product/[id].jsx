import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExteras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExteras([...extras, option]);
    } else {
      changePrice(-option.price);
      setExteras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const addToCart = () => {
    // console.log("hello");
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
    // console.log({ ...pizza, extras, price, quantity });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>₹{price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the Size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span className={styles.number}>large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose the Size</h3>
        <div className={styles.choose}>
          <div className={styles.ingredients}>
            {pizza.extraOption.map((option) => (
              <div className={styles.option} key={option._id}>
                <input
                  type="checkbox"
                  name={option.text}
                  id={option.text}
                  className={styles.checkbox}
                  onChange={(e) => handleChange(e, option)}
                />
                <label style={{ cursor: "pointer" }} htmlFor="double">
                  {option.text} ₹{option.price}
                </label>
              </div>
            ))}
          </div>
          <div className={styles.add}>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              defaultValue={1}
              className={styles.quantity}
            />

            <button onClick={addToCart} className={styles.button}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
