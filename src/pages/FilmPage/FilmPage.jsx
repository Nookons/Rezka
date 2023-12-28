import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {Box, Button, Modal, Rating, TextareaAutosize, TextField, Typography} from "@mui/material";
import styles from './Film.module.css'

import Description from "./FilmPageComponents/Description/Description";
import {useDispatch} from "react-redux";
import {fetchComments} from "../../stores/async/fetchComments";
import {ref, set} from "firebase/database";
import {database} from "../../firebase";
import { useSelector } from 'react-redux';

const FilmPage = () => {
    const dispatch = useDispatch();
    const href = window.location.href
    const id = href.split('_')[1]
    const [film, setFilm] = useState();
    const [trailer, setTrailer] = useState();
    const [key, setKey] = useState();

    const comments = useSelector((state) => state.movies.comments)

    const [modal, setModal] = useState(false);

    const [userName, setUserName]       = useState('');
    const [commentBody, setCommentBody] = useState('');


    useEffect(() => {
        async function get() {
            const responseTrailer = await axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=411d08d89a4569fb1b50aec07ee6fb72')
            const response = await axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=411d08d89a4569fb1b50aec07ee6fb72')
            const responseComments = await dispatch(fetchComments(id))

            console.log(responseComments);
            setTrailer(responseTrailer.data.results);
            setFilm(response.data)
        }

        get()
    }, []);

    function handleOpen() {
        setModal(true)
    }

    function handleClose() {
        setModal(false)
    }


    const sendFeedBack = useCallback((event) => {
        console.log(userName)
        console.log(commentBody)

        set(ref(database, 'comments/' + id + '/' + Date.now()), {
            id: Date.now(),
            username: userName,
            body: commentBody,
        });
        window.location.reload();
    }, []);

    return (
        <div className={styles.Main}>
            {trailer
                ?
                <Modal
                    open={modal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={styles.Modal}
                >
                    <Box>
                        {trailer.map(element => {
                            switch (element.name) {
                                case "Official Trailer":
                                    return (
                                        <iframe
                                            className={styles.Frame}
                                            src={`https://www.youtube.com/embed/${element.key}?si=Jx63sB7D1L0Zs6WM`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    )
                                default:
                                    break
                            }
                        })}
                    </Box>
                </Modal>
                : null
            }

            {film
                ?
                <div className={styles.FilmContainer}>
                    <div className={styles.Wrapper}>
                        <div>
                            <img src={"https://image.tmdb.org/t/p/w500" + film.poster_path} alt=""/>
                            <Button onClick={() => handleOpen()}>Watch Trailer</Button>
                        </div>

                        <Description film={film}/>
                    </div>
                    <p className={styles.MainDescription}>Description: <span>{film.overview}</span></p>
                    <br/>
                    <h4>Leave a feedback</h4>
                    <div style={{display:'flex', flexDirection: 'column', gap: 14, margin: '14px 0'}}>
                        <TextField
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
                            placeholder="Please leave a comment here with a maximum of 250 characters"
                            multiline
                        />
                    </div>
                    <Button variant="contained" onClick={sendFeedBack}>Add feedback</Button>

                    {comments
                    ?
                        comments.reverse().map((e, index) => {

                            return (
                                <div style={{marginTop: 14, border: '1px solid black', padding: 14, borderRadius: 4}}>
                                    <h5>{e.username ? e.username : 'null'}</h5>
                                    <br/>
                                    <h4>{e.body ? e.body : 'Null'}</h4>
                                </div>
                            )
                        })
                    : null}
                </div>
                :
                null
            }
        </div>
    );
};

export default FilmPage;