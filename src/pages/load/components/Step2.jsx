import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./StepStyles.module.css";
import { v4 as uuidv4 } from "uuid";
import { useMoralis } from "react-moralis";


const Step2 = ({ selectedSafe, wallets, setSelectedSafe }) => {

  const {account } = useMoralis()
 
  

  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    if (name === "safes") {
      setSelectedSafe(value);
    }
  };

 

  return (
    <div className={styles.step}>
      <div className={styles.step_heading}>
        <Typography>
          Your connected wallet has the following alpha safe connected, 
        </Typography>
      </div>
      <div className={styles.step_owners_content}>
          <select onChange={handleSelectChange} name="safes" value={selectedSafe}  id="">
            <option value="">pick safe</option>
            {
              wallets.map((wallet)=>{
                return  <option key={wallet} value={wallet}>{wallet}</option>
              })
            }
           
          </select>
      </div>
    </div>
  );
};

export default Step2;
