import React, {useCallback, useState} from 'react';
import {Button, TextField} from "@mui/material";
import styles from "../../Film.module.css";
import {useDispatch} from "react-redux";
import {sendToDataBase} from "../../../../utils/database";
import Loader from "../../../../components/Loader/Loader";
import dayjs from "dayjs";

const AddFeedback = ({id}) => {
    const dispatch = useDispatch();


    const [userName, setUserName] = useState('');
    const [commentBody, setCommentBody] = useState('');

    const [loader, setLoader] = useState(false);


    const sendFeedback = async () => {
        const filmId = id;
        const commentId = Date.now();

        const year = dayjs().get('year')
        const month = dayjs().get('month') + 1
        const date = dayjs().get('date')

        const hour = dayjs().get('hour')
        const minute = dayjs().get('minute')


        const TimeStamp = date + '-' + month + '-' + year + ' | ' + hour + ':' + minute

        setLoader(true)

        if (userName.length < 4 || commentBody.length < 4) {
            alert('Pls dont send empty comment')
            setLoader(false)
            return
        }

        if (!navigator.onLine) {
            console.error('No internet connection');
            setLoader(false)
            alert('Comment not added')
            return false;
        }


        const response      = await sendToDataBase({userName, commentBody, filmId, TimeStamp, commentId});



        const comment = {
            id: commentId,
            username: userName,
            timestamp: TimeStamp,
            body: commentBody,
            likes: 0,
            userLike: false
        };

        if (response) {
            setTimeout(() => {
                setUserName('')
                setCommentBody('')
                setLoader(false)
                dispatch({type: 'ADD_COMMENT', payload: comment});
            }, 500)
        } else {
            setLoader(false)
            alert('Comment not added')
            console.error('Failed to add comment to the database.');
        }

    };


    return (
        <div>
            <Loader value={loader} setValue={setLoader}/>
            <h4>Leave a feedback</h4>
            <hr/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                margin: '14px 0'
            }}>
                <TextField
                    type={'email'}
                    id="outlined-basic"
                    label="You're nickname"
                    variant="outlined"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <TextField
                    id="outlined-textarea"
                    label="Feedback"
                    value={commentBody}
                    onChange={e => setCommentBody(e.target.value)}
                    placeholder="Please leave a comment here with a maximum of 550 characters"
                    multiline
                />
            </div>
            <Button className={styles.Btn} onClick={sendFeedback}>Add feedback</Button>
        </div>
    );
};

export default AddFeedback;