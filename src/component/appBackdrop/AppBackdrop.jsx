import React from 'react'
import Backdrop from '@mui/material/Backdrop';

const AppBackdrop = ({child, openModal, handleCloseModal}) => {
    return ( 
        <Backdrop
        sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
        onClick={handleCloseModal}
        style={{background: '#e5e5e5b4'}}

      >
         {child} 
      </Backdrop>
     );
}
 
export default AppBackdrop;