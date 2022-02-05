import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import styles from "./Card.module.css";

const AppCard = ({
  title,
  handleCardAction,
  handleChange,
  name1,
  inputField1,
  inputField2,
  name2,
  placeholder1,
  placeholder2,
  description,
}) => {
  const [isShowing, setIsShowing] = useState("");

  useEffect(() => {
    handleWhatToShow();
  }, []);

  const handleWhatToShow = () => {
    if (title === "Request a transaction") {
      setIsShowing(title);
    } else if (title === "Request to update quorum") {
      setIsShowing(title);
    } else if (title === "Deposit funds") {
      setIsShowing(title);
    } else if (title === "Request to remove an owner") {
      setIsShowing(title);
    } else if (title === "Request to add an owner") {
      setIsShowing(title);
    }
  };

  return (
    <Card sx={{ minWidth: 275, minHeight: 350 }}>
      <CardContent>
        <div className={styles.card_header}>
          <Typography>{title}</Typography>
        </div>
        <div className={styles.card_body}>
          <Typography>{description}</Typography>
          <div className={styles.card_form}>
            {isShowing === "Request a transaction" && (
              <>
                <input
                  onChange={handleChange}
                  value={inputField1}
                  name={name1}
                  type="text"
                  placeholder={placeholder1}
                />
                <input
                  onChange={handleChange}
                  value={inputField2}
                  name={name2}
                  type="text"
                  placeholder={placeholder2}
                />
              </>
            )}

            {isShowing === "Request to update quorum" && (
              <>
                <input
                  onChange={handleChange}
                  value={inputField1}
                  name={name1}
                  type="text"
                  placeholder={placeholder1}
                />
              </>
            )}
            {isShowing === "Deposit funds" && (
              <input
                onChange={handleChange}
                value={inputField1}
                name={name1}
                type="text"
                placeholder={placeholder1}
              />
            )}
            {
                isShowing === 'Request to remove an owner' && 
                <input
                onChange={handleChange}
                value={inputField1}
                name={name1}
                type="text"
                placeholder={placeholder1}
              />
            }
            {
                isShowing=== 'Request to add an owner' &&  <input
                onChange={handleChange}
                value={inputField1}
                name={name1}
                type="text"
                placeholder={placeholder1}
              />
            }
          </div>
        </div>
      </CardContent>
      <CardActions>
        <div className={styles.card_btn}>
          <button onClick={handleCardAction}>{title}</button>
        </div>
      </CardActions>
    </Card>
  );
};

export default AppCard;
