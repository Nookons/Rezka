import React, {useCallback, useState} from 'react';
import {Button, TextField} from "@mui/material";
import styles from "../../Film.module.css";
import {useDispatch, useSelector} from "react-redux";
import {sendToDataBase} from "../../../../utils/database";
import Loader from "../../../../components/Loader/Loader";
import dayjs from "dayjs";

const AddFeedback = ({id}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [userName, setUserName] = useState('');
    const [commentBody, setCommentBody] = useState('');

    const [loader, setLoader] = useState(false);


    const sendFeedback = async () => {
        try {
            const filmId = id;
            const commentId = Date.now();
            const TimeStamp = dayjs().format('DD-MM-YYYY | HH:mm');

            setLoader(true);

            const isCommentInvalid = (user.uid && commentBody.length < 4) || (!user.uid && (userName.length < 4 || commentBody.length < 4));

            if (isCommentInvalid) {
                alert('Please do not send an empty comment');
                setLoader(false);
                return;
            }

            const response = await sendToDataBase({
                userName,
                commentBody,
                filmId,
                TimeStamp,
                commentId,
                user
            });

            if (response) {
                setTimeout(() => {
                    setUserName('');
                    setCommentBody('');
                    setLoader(false);
                    const comment = {
                        id: commentId,
                        username: user.uid ? user.email : userName,
                        timestamp: TimeStamp,
                        body: commentBody,
                        likes: 0,
                        userLike: [],
                    };
                    dispatch({ type: 'ADD_COMMENT', payload: comment });
                }, 500);
            } else {
                setLoader(false);
                alert('Comment not added');
                console.error('Failed to add comment to the database.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setLoader(false);
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
                {user.uid
                    ?
                    <div>Name of: {user.email}</div>
                    :
                    <TextField
                        type={'email'}
                        id="outlined-basic"
                        label="You're nickname"
                        variant="outlined"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                }
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