import Image from "next/image";
import styles from "../styles/Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto} style={{ color: "#b7903c" }}>
            LICORICE PIZZA
          </h2>
          <h2 className={styles.motto}>YOU WISH! WE DELEVERED</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>CONTECTS</h1>
          <p className={styles.text}>
            A-808, Titanium square
            <br />
            Thaltej, Ahemdabad
            <br />
            Gujrat, 380054
            <br />
            797 992 7512
          </p>
          <div className={styles.socialMediaIcons}>
            <FacebookIcon style={{ fontSize: "35px", cursor: "pointer" }} />
            <YouTubeIcon style={{ fontSize: "35px", cursor: "pointer" }} />
            <Link href="https://www.linkedin.com/in/sourabh-kumar-80b8b0212/">
              <LinkedInIcon style={{ fontSize: "35px", cursor: "pointer" }} />
            </Link>
          </div>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY TO FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
