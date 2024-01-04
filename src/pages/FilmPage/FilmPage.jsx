import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {Box, Button, Modal, Rating, TextareaAutosize, TextField, Typography} from "@mui/material";
import styles from './Film.module.css'

import Description from "./FilmPageComponents/Description/Description";
import {useDispatch} from "react-redux";
import {fetchComments} from "../../stores/async/fetchComments";
import {ref, set} from "firebase/database";
import {database} from "../../firebase";
import {useSelector} from 'react-redux';
import AddFeedback from "./FilmPageComponents/Feedback/AddFeedback";
import FeedbackScreen from "./FilmPageComponents/Feedback/FeedbackScreen";
import MainSkeleton from "./FilmPageComponents/Skeleton/MainSkeleton";
import {fetchMovies} from "../../stores/async/fetchMovies";

const FilmPage = () => {
    const dispatch = useDispatch();
    const href = window.location.href
    const id = href.split('_')[1]

    const movies = useSelector((state) => state.movies);

    const page = 1


    const [film, setFilm] = useState();
    const [trailer, setTrailer] = useState();
    const [key, setKey] = useState();

    const [modal, setModal] = useState(false);

    useEffect(() => {
        async function get () {
            const response = await dispatch(fetchMovies({page}))
        }
        get()
    }, []);

    console.log(film);
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
                        {trailer.map((element, index) => {
                            switch (element.name) {
                                case "Official Trailer":
                                    return (
                                        <iframe
                                            key={index}
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
                        <div className={styles.Banner}>
                            <img src={"https://image.tmdb.org/t/p/w500" + film.poster_path} alt=""/>
                            <Button className={styles.Btn} onClick={() => handleOpen()}>Watch Trailer</Button>
                            <Button className={styles.Btn} href={film.homepage}>Watch</Button>
                        </div>

                        <Description film={film}/>
                    </div>
                    <p className={styles.MainDescription}>Description: <span>{film.overview}</span></p>
                    <br/>
                    <h5>Popular movies...</h5>
                    <br/>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                        {movies.movies.map((e, index) => {

                            if (e.id.toString() === id) {
                                index -= 1
                            }

                            if (index < 6 && e.id.toString() !== id) {
                                return (
                                    <div>
                                        <img style={{maxWidth: 105}}
                                             src={"https://image.tmdb.org/t/p/w500" + e.poster_path} alt=""/>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <br/>
                    <div className={styles.FeedBackPlace}>
                        <FeedbackScreen id={id}/>
                        <AddFeedback id={id}/>
                    </div>
                </div>
                :
                <MainSkeleton/>
            }
        </div>
    );
};

export default FilmPage;