import { Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

const Navbar = () => {

    return ( 
        <nav className={styles.navbar}>
            <Container>
                <div className={styles.navbar_content}>
                    <div className={styles.logo}>
                    <Link to='/' >Alpha Safe</Link>
                    </div>
                    <div className={styles.navbar_links}>
                    <Link to='/create' >Create</Link>
                    <Link to='/load' >Load</Link>
                    </div>
                </div>
            </Container>
        </nav>
     );
}
 
export default Navbar;