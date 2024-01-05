import React, {useCallback, useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../stores/async/fetchUser";
import LoginIcon from '@mui/icons-material/Login';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import {SIGN_IN_ROUTE} from "../../utils/consts";
import LogoutIcon from '@mui/icons-material/Logout';
import {mySignOut} from "../../utils/database";
import Loader from "../Loader/Loader";
import {userSignInAction} from "../../stores/userReducer";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const getUser = async () => {
            const response = await dispatch(fetchUser());
            console.log(response);
        }
        getUser()
    }, []);



    const [burger, setBurger] = useState(false);
    const [loader, setLoader] = useState(false);

    const onBurgerClick = useCallback(() => {
        setBurger(prevBurger => !prevBurger);
    }, []);

    const onLoginIconClick = useCallback((event) => {
        navigate(SIGN_IN_ROUTE)
    }, []);

    const onLogOutIconClick = async (event) => {
        try {
            setLoader(true)
            const response = await mySignOut();

            if (response) {
                setTimeout(() => {
                    setLoader(false)
                    dispatch(userSignInAction(null))
                }, 500)
            }
        }catch (error) {
            setLoader(false)
            console.error(error);
        }
    };

    return (
        <div className={styles.Main}>
            <Loader value={loader} setValue={setLoader}/>
            <div className={styles.LogoPlace}>
                <img src={logo} alt=""/>
            </div>
            <div className={burger ? styles.BurgerActive : styles.Burger} onClick={onBurgerClick}>
                <a></a>
            </div>
            <div className={styles.Wrapper }>
                <div className={burger ? styles.NavBarBurger : styles.NavBar}>
                    <Link to="/">Home</Link>
                    <Link to="/favorite">Favorite</Link>
                </div>
                {user
                    ?
                    <div>
                        {!user.uid
                            ? <LoginIcon style={{ cursor: 'pointer'}} onClick={onLoginIconClick}/>
                            : <LogoutIcon style={{ cursor: 'pointer'}} onClick={onLogOutIconClick}/>
                        }
                    </div>
                    : null
                }
            </div>
        </div>
    )
};

export default Navbar;