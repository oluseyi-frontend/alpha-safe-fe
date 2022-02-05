import { Typography } from '@mui/material';
import React from 'react';
import styles from './StepStyles.module.css'

const Step3 = ({owners, confirmation,}) => {
    return (
      <div className={styles.step}>
        <div className={styles.review}>
            <div className={styles.review_wallet}>
            <Typography >Wallet Onwers:</Typography>
          {owners.map((owner) => {
            return <Typography key={owner.id}>{owner.addr}</Typography>;
          })}
            </div>
         
          <div className={styles.review_confirmations}>
          <Typography> No of confirmations:</Typography>
          <Typography>{confirmation}</Typography>
          </div>
        
        </div>
      </div>
    );
}
 
export default Step3;