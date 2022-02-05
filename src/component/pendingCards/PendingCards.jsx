import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import styles from "./PendingCard.module.css";
import useAddrShortener from "../../custom hooks/useAddrShoterner";

const PendingCard = ({ title, handleCardAction, data }) => {
  const { shorten, shortened } = useAddrShortener();

  useEffect(() => {
    if (data.addr) {
      shorten(data.addr);
    }
  }, [data]);

  return (
    <Card sx={{ minWidth: 275, minHeight: 250 }}>
      <CardContent>
        <div className={styles.card_header}>
          <Typography>{title}</Typography>
        </div>
        <div className={styles.card_body}>
          {data.addr == undefined ? (
            <Typography>Threshold: {data.threshold}</Typography>
          ) : (
            <Typography>Address: {shortened}</Typography>
          )}

          {data.value == undefined ? null : (
            <Typography>Value: {data.value}</Typography>
          )}

          <Typography>Transaction Index: {data.index}</Typography>
          <Typography>Total signatures: {data.sig}</Typography>
        </div>
      </CardContent>
      <CardActions>
        <div className={styles.card_btn}>
          <button
            onClick={() => {
              handleCardAction(data.index);
            }}
          >
            Approve
          </button>
        </div>
      </CardActions>
    </Card>
  );
};

export default PendingCard;
