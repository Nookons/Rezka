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

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector( (state) => state.user.user)

    useEffect(() => {
        if (user.uid) {
            navigate(HOME_ROUTE)
        }
    }, []);

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

    return (
        <div className={MainStyles.Main}>
            <Loader value={loader} setValue={setLoader}/>
            <div className={MainStyles.Wrapper}>
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
                <Button className={styles.Btn} onClick={signIn}>Sign In</Button>
            </div>
        </div>
    );
};

export default SignIn;