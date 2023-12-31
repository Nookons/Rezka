import React from 'react';
import {Button, Skeleton} from "@mui/material";
import styles from "../../Film.module.css";
import Description from "../Description/Description";
import FeedbackScreen from "../Feedback/FeedbackScreen";
import AddFeedback from "../Feedback/AddFeedback";
import DescriptionSkeleton from "../Description/DescriptionSkeleton";

const MainSkeleton = () => {
    return (
        <div className={styles.FilmContainer}>
            <div className={styles.Wrapper}>
                <div className={styles.Banner}>
                    <Skeleton variant="rounded" width={350} height={525}/><br/>
                    <Skeleton variant="rounded" width={350} height={36}/>
                </div>

                <DescriptionSkeleton />
            </div>
            <br/>
            <Skeleton variant="rounded" width={'100%'} height={66}/>
            <br/>

            {/*<div className={styles.FeedBackPlace}>
                <FeedbackScreen />
                <AddFeedback id={id}/>
            </div>*/}

        </div>
    );
};

export default MainSkeleton;