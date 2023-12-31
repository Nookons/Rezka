import React from 'react';
import styles from "./Description.module.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Skeleton, Slider, Stack} from "@mui/material";

const DescriptionSkeleton = () => {
    return (
        <div className={styles.Main}>
            <div className={styles.DescriptionWrapper}>
                <Skeleton variant="rounded" width={550} height={35}/>
                <Skeleton variant="rounded" width={150} height={25}/>
                <Skeleton variant="rounded" width={350} height={25}/>
                <Skeleton variant="rounded" width={450} height={25}/>
                <Skeleton variant="rounded" width={150} height={25}/>
                <Skeleton variant="rounded" width={250} height={25}/>
                <Skeleton variant="rounded" width={150} height={25}/>
                <Skeleton variant="rounded" width={120} height={25}/>
                <Skeleton variant="rounded" width={450} height={25}/>
                <Skeleton variant="rounded" width={150} height={25}/>
                <Skeleton variant="rounded" width={450} height={25}/>
                <Skeleton variant="rounded" width={150} height={25}/>
                <Skeleton variant="rounded" width={120} height={25}/>
            </div>
        </div>
    );
};

export default DescriptionSkeleton;