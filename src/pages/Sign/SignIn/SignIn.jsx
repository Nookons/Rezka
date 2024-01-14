import React, {useCallback, useEffect, useState} from 'react';
import MainStyles from '../Sing.module.css'
import {Button, TextField} from "@mui/material";
import styles from "../../FilmPage/Film.module.css";
import {mySignIn} from "../../../utils/database";
import {useDispatch, useSelector} from "react-redux";
import {userSignInAction} from "../../../stores/userReducer";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/consts";
import Loader from "../../../components/Loader/Loader";
import logo from '../../../assets/logo.png'

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector( (state) => state.user.user)

    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    const signIn = async (event) => {
        try {
            setLoader(true)
            const response = await mySignIn({nickName, password})

            if (response) {
                setTimeout(() => {
                    setLoader(false)
                    dispatch(userSignInAction(response))
                    navigate(HOME_ROUTE)
                })
            }
        }catch (e) {
            console.log(e);
            setLoader(false)
        }
    };

    useEffect(() => {
        // If user is authenticated, redirect to home
        if (user && user.uid) {
            navigate(HOME_ROUTE);
        }
    }, [user]);

    return (
        <div className={MainStyles.Main}>
            <Loader value={loader} setValue={setLoader}/>
            <div className={MainStyles.Wrapper}>
                <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 34}}>
                    <img style={{maxWidth: 32}} src={logo} alt=""/>
                    <h4>Welcome back !!!</h4>
                </div>
                <article>Login:</article>
                <TextField
                    required
                    id="outlined-required"
                    type="email"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder="Please leave a login here"
                />
                <article>Password:</article>
                <TextField
                    id="outlined-password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Please leave a password here"
                />
                <article style={{marginTop: 34}}>Don't have account? <span style={{color: "#7272fd", textDecoration: 'underline dotted #7272fd', cursor: 'pointer'}}>Sign up</span></article>
                <Button className={styles.Btn} onClick={signIn}>Sign In</Button>
            </div>
        </div>
    );
};

export default SignIn;