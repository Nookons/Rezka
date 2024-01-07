import React, {useState} from 'react';
import styles from "../../Film.module.css";
import {Box, Button, Modal, TextField} from "@mui/material";
import {addCommentChild} from "../../../../utils/database";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {addChildAction} from "../../../../stores/moviesReducer";

const AddAnswer = ({id, comment, user}) => {
    const dispatch = useDispatch();
    const [isAnswer, setIsAnswer] = useState(false);
    const [answerBody, setAnswerBody] = useState('');

    const [userName, setUserName] = useState('');

    const addAnswer = () => {
        setIsAnswer(true)
    }

    const sendAnswer = async () => {
        try {
            const TimeStamp = dayjs().format('DD-MM-YYYY | HH:mm');

            const temporaryComment = {
                id: Date.now(),
                fatherId: comment.id,
                body: answerBody,
                likes: 0,
                timestamp: TimeStamp,
                username: user.uid ? user.email : userName

            }
            const response = await addCommentChild({id, comment, temporaryComment, user, answerBody})

            if (response) {
                setAnswerBody('')
                setIsAnswer(false)

                dispatch(addChildAction(temporaryComment))
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Modal
                open={isAnswer}
                onClose={() => setIsAnswer(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
                <div style={{display:'flex',flexDirection: 'column',backgroundColor: 'white', padding: '40px 80px', borderRadius: 14}}>
                    <article>Add answer to comment ID: {comment.id}</article>
                    <article>Add answer to User: {comment.username}</article>
                    <br/>
                    <article>Current user ID: {user.uid ? user.uid : 'Unknown'}</article>
                    <article>Current user Name: { user.uid ? user.email : 'Unknown'}</article>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
                        {!user.uid
                            ? <TextField
                                style={{minWidth: '100%'}}
                                id="outlined-textarea"
                                label="Nickname"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                placeholder="Please leave a nickname"
                                multiline
                            />
                            : null
                        }
                        <TextField
                            style={{minWidth: '100%'}}
                            id="outlined-textarea"
                            label="Feedback"
                            value={answerBody}
                            onChange={e => setAnswerBody(e.target.value)}
                            placeholder="Please leave a comment here with a maximum of 550 characters"
                            multiline
                        />
                    </div>
                    <Button className={styles.Btn} onClick={sendAnswer}>Add answer</Button>
                </div>
            </Modal>
            <Button className={styles.Btn} onClick={addAnswer}>Reply</Button>
        </div>
    );
};

export default AddAnswer;