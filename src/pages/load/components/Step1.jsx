import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./StepStyles.module.css";
import useModal from "../../../custom hooks/useModal";
import AppBackdrop from "../../../component/appBackdrop/AppBackdrop";
import WalletsModal from "../../../component/walletsModal/WalletModal";
import { useMoralis, useChain } from "react-moralis";

const Step1 = () => {
  const { toggle, isWalletModalShowing } = useModal();
  const {switchNetwork} = useChain()
  const {isAuthenticated,logout, authenticate, isWeb3Enabled, enableWeb3 ,chainId} = useMoralis()



  useEffect(() => {
    if (isAuthenticated) {
      if(isWeb3Enabled){

      }else{
        enableWeb3();
      }
     
    }
  }, [isAuthenticated]);

  const handleToggleWalletModal = () => {
    toggle("wallet-modal");
  };

  const handleDisconnectWallet=async()=>{
 await logout()
 window.localStorage.removeItem("connectorId");
  }

 
  const handleConnect = async (connectorID) => {
    try {
      await authenticate({ provider: connectorID });
      enableWeb3({ provider: connectorID });
      window.localStorage.setItem("connectorId", connectorID);
      handleToggleWalletModal()
    } catch (error) {}
  };

  const handleSwitchNetwork=()=>{
    switchNetwork(0x4)

  }

  return (
    <div className={styles.step}>
      <div className={styles.step_heading}>
        <Typography>{ isAuthenticated ?  chainId == '0x4' ? 'everything is perfect now, you can proceed'  :  'please connect to the rinkeby testnet then reload page'    : 'please connect wallet' } </Typography>
      </div>
      <div className={styles.step_action}>
      {/* {
        isAuthenticated ? chainId == '0x4' ? null : <button onClick={handleSwitchNetwork}>Switch to Rinkeby network</button> : null
         
       } */}
        {
          isAuthenticated ?<button onClick={handleDisconnectWallet}>Disconnect wallet</button> :  <button onClick={handleToggleWalletModal}>Connect</button>
        }
       
      </div>
      {isWalletModalShowing && (
        <AppBackdrop
          child={<WalletsModal handleConnect={handleConnect} handleCloseModal={handleToggleWalletModal} />}
          handleCloseModal={handleToggleWalletModal}
          openModal={isWalletModalShowing}
        />
      )}
    </div>
  );
};

export default Step1;
