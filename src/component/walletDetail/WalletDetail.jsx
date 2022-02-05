import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import styles from './WalletDetail.module.css'
import useAddrShortener from '../../custom hooks/useAddrShoterner';


const WalletDetail = ({walletBalance, threshold, totalOwners, ownersAddr}) => {
    const {shorten, shortened} = useAddrShortener()
    const [addrs, setAddrs] = useState([])
    useEffect(()=>{
        if(ownersAddr){
          const tempAddrs = ownersAddr.map((addr)=>{
                return (`${addr.slice(0, 6)}...${addr.slice(-4)}`)
            })

            setAddrs(tempAddrs)
        }
    }, [ownersAddr])

 


    return ( 
        <div className={styles.wallet_details}>
        <div className={styles.wallet_detail}>
          <Typography variant="h6">Contract's Balance</Typography>
          <Typography>{walletBalance}</Typography>
        </div>
        <div className={styles.wallet_detail}>
          <Typography variant="h6">Contract's Quorum</Typography>
          <Typography>{threshold}</Typography>
        </div>
        <div className={styles.wallet_detail}>
          <Typography variant="h6">Number of Owners</Typography>
          <Typography>{totalOwners}</Typography>
        </div>
        <div className={styles.wallet_detail}>
          <Typography variant="h6">Address of Owners</Typography>
          {addrs.map((ownerAddr) => {
            return <Typography key={ownerAddr}>{ownerAddr}</Typography>;
          })}
        </div>
      </div>
     );
}
 
export default WalletDetail;