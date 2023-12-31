import React, {useState} from 'react';
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import styles from './FeedbackScreen.module.css'
import {Button} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FeedbackScreen = () => {
    const comments          = useSelector((state) => state.movies.comments);
    const copiedArray       = [...comments]; //Copied array
    const reversedArray     = copiedArray.reverse();
    const date              = dayjs().get('date')


    return (
        <div>
            {comments.length
                ?
                <div>
                    <h4>Last comments...</h4>
                    <hr/>
                    {
                        reversedArray.map((e, index) => {
                            const day = e.timestamp.split('-')[0]
                            const Time = e.timestamp.split('|')[1]

                            if (index < 5) {
                                return (
                                    <div key={index} style={{
                                        marginTop: 14,
                                        border: '1px solid black',
                                        padding: 14,
                                        borderRadius: 4,
                                    }}>
                                        <h6>{e.username}</h6>
                                        <p style={{marginTop: 4, color: 'gray'}}>{date.toString() === day ? 'Today at:' + Time : e.timestamp}</p>
                                        <br/>
                                        <p>{e.body}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                :
                <div>
                    <h4>No anyone comments here...</h4>
                    <hr/>
                </div>
            }
        </div>
    );
};

export default FeedbackScreen;