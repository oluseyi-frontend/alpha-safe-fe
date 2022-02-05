import React, {useEffect} from "react";
import styles from "./WalletsModal.module.css";
import { connectors } from "../connectors/Connectors";
import { Typography } from "@mui/material";
import { useMoralis } from "react-moralis";

const WalletsModal = ({handleCloseModal, handleConnect}) => {
  const { authenticate, isAuthenticated,enableWeb3, account,  chainId, logout } =
    useMoralis();


  
       




  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.wallet_modal}
    >
      {connectors.map((connector) => {
        return (
          <div
            onClick={() => {
              handleConnect(connector.connectorId);
            }}
            className={styles.wallet}
            key={connector.title}
          >
            <Typography>{connector.title}</Typography>
            <img src={connector.icon} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default WalletsModal;
