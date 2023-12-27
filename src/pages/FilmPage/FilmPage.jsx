import React, {useEffect, useState} from 'react';
import axios from "axios";
import {styled} from "@mui/material/styles";
import {Box, Button, Modal, Rating, TextareaAutosize, Typography} from "@mui/material";
import styles from './Film.module.css'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Description from "./FilmPageComponents/Description/Description";

const FilmPage = () => {
    const href = window.location.href
    const id = href.split('_')[1]
    const [film, setFilm] = useState();
    const [trailer, setTrailer] = useState();
    const [key, setKey] = useState();

    const [modal, setModal] = useState(false);


    useEffect(() => {
        async function get() {
            const responseTrailer = await axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=411d08d89a4569fb1b50aec07ee6fb72')
            const response =  await axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=411d08d89a4569fb1b50aec07ee6fb72')
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

                        <Description film={film} />
                    </div>
                    <p className={styles.MainDescription} >Description: <span>{film.overview}</span></p>
                    <br/>
                    <h4>Leave a feedback</h4>
                    <textarea style={{resize: 'none' }} id="w3review" name="w3review" rows="6" cols="999">
                        At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                    </textarea>
                    <Button variant="contained">Add feedback</Button>
                </div>
                :
                null
            }
        </div>
    );
};

export default FilmPage;