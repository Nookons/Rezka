import React, {useCallback, useState} from 'react';
import styles from './Navbar.module.css'
import {Link} from "react-router-dom";
import logo from '../../assets/react-logo.svg'

const Navbar = () => {
    const [burger, setBurger] = useState(false);

    const onBurgerClick = useCallback(() => {
        setBurger(prevBurger => !prevBurger);
    }, []);

    return (
        <div className={styles.Main}>
            <div className={styles.LogoPlace}>
                <img src={logo} alt=""/>
            </div>
            <div className={burger ? styles.BurgerActive : styles.Burger} onClick={onBurgerClick}>
                <a></a>
            </div>
            <div className={burger ? styles.NavBarBurger : styles.NavBar}>
                <Link to="/">Home</Link>
                <Link to="/store">Store</Link>
            </div>
        </div>
    )
};

export default Navbar;