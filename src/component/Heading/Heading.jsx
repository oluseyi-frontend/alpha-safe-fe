import { Typography } from '@mui/material';
import React from 'react';



const Heading = ({content, variant}) => {


    return ( 
        <Typography variant={variant}>
            {content}
        </Typography>
     );
}
 
export default Heading;