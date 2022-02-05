import { Typography } from '@mui/material';
import React from 'react';
import styles from './StepStyles.module.css'

const Step3 = ({account,selectedSafe, confirmation,}) => {
    return (
      <div className={styles.step}>
        <div className={styles.review}>
            <div className={styles.review_wallet}>
            <Typography >Wallet created by:</Typography>
        
           <Typography>{account}</Typography>
        
            </div>
         
          <div className={styles.review_confirmations}>
          <Typography> wallet contract address:</Typography>
          <Typography>{selectedSafe}</Typography>
          </div>
        
        </div>
      </div>
    );
}
 
export default Step3;