import {
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import styles from "./ApprovalModal.module.css";
import Moralis from 'moralis'


const ApprovalModal = ({
  loadPendingData,
  pendingTransactionData,
  pendingAddOwnerData,
  pendingRemoveOwnerData,
  pendingUpdatethresholdData,
  handleGetPendingTransactionData,
  handleGetPendingAddOwnerData,
  handleGetPendingRemoveOwnerData,
  handleGetPendingUpdatethresholdData,
  setLoadPendingData,
}) => {
  useEffect(() => {
    setLoadPendingData(true);
    handleGetPendingTransactionData();
    handleGetPendingAddOwnerData();
    handleGetPendingUpdatethresholdData();
    handleGetPendingRemoveOwnerData();
  }, []);

  const [pendingTrx, setPendingTrx] = useState([]);

  useEffect(() => {
   handleRestructureData()
  }, [pendingTransactionData]);

  const handleRestructureData = () => {
    const temptrx = pendingTransactionData.map((data) => {
        return {
          to: data[0],
          value: Moralis.Units.FromWei(data[1].toString()),
          index: data[2].toString(),
          sig: data[3].toString(),
          approved: data[4]
        };
      
      });
      setPendingTrx(temptrx);
  };

  return (
    <div className={styles.approval_modal}>
      {loadPendingData ? (
        <LinearProgress />
      ) : (
        <div className={styles.approval_modal_content}>
          <div className={styles.approval_modal_content_heading}>
            <Heading content={"Pending approvals"} variant={"h6"} />
          </div>
          <div className={styles.transaction}>
            <Typography>Transaction request</Typography>
            <div className={styles.transaction_cards}>
            {pendingTrx.map((data) => {
              return (
               
                  <Card sx={{ minWidth: 205, minHeight: 150 }}>
                    <CardContent>
                      <div className={styles.card_header}>Pending Transaction</div>
                      <div className={styles.card_body}>
                        <Typography>
                            To: {data.to}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <div className={styles.card_btn}>
                          <button>review</button>
                      </div>
                    </CardActions>
                  </Card>
               
              );
            })}
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalModal;
