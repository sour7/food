import React from "react";
import styles from "../styles/EditForm.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const EditForm = ({ setEditform }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.close}>
          <HighlightOffIcon
            style={{ cursor: "pointer" }}
            onClick={() => setEditform(false)}
          />
        </div>
        <h3>Update Products</h3>
      </div>
    </div>
  );
};

export default EditForm;
