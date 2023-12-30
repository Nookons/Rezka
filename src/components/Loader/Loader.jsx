import React from 'react';
import {CircularProgress} from "@mui/material";
import styles from './Loader.module.css'

const Loader = ({value, setValue}) => {

    const rootClasses = [
        styles.Main
    ]

    if (value) {
        rootClasses.push(styles.Active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <CircularProgress />
        </div>
    );
};

export default Loader;