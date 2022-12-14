import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "../styles/Featured.module.css";
import Image from "next/image";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      // items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Carousel
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
      >
        <div className={styles.bannerImg}>
          <Image src="/img/Pizza.jpg" layout="fill" alt="" />
        </div>
        <div className={styles.bannerImg}>
          <Image src="/img/pizza2.png" layout="fill" alt="" />
        </div>
        <div className={styles.bannerImg}>
          <Image src="/img/pizza1.jpg" layout="fill" alt="" />
        </div>
        <div className={styles.bannerImg}>
          <Image src="/img/pizza2.png" layout="fill" alt="" />
        </div>
      </Carousel>
    </>
  );
};

export default Featured;
