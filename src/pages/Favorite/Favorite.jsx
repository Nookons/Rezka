import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./Favorite.module.css";
import stylesMovie from "../Home/Home.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {styled} from "@mui/material/styles";
import {Button, Rating, Skeleton} from "@mui/material";
import MyModal from "../Home/MyModal";
import axios from "axios";

const Favorite = () => {
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.favorite.favoriteItems)
    const [film, setFilm] = useState();

    const [isOpen, setIsOpen] = useState(false);

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });

    const uniqArray = favorite.filter((value, index, self) => {
        return self.findIndex(v => v.id === value.id) === index;
    });

    async function openMovie(id) {
        const response = uniqArray.filter(element => element.id === id)
        setFilm(response[0])
        setIsOpen(true)
    }


    console.log(favorite)
    return (
        <div className={styles.Main}>
            <MyModal visible={isOpen} setVisible={setIsOpen}>
                {film
                    ?
                    <div>
                        <img src={"https://image.tmdb.org/t/p/w500" + film.poster_path} alt=""/>
                        <div>
                            <h1>{film.title}</h1>
                            <h5>{film.tagline}</h5>
                            <StyledRating
                                name="customized-color"
                                defaultValue={film.vote_average}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={1}
                                icon={<FavoriteBorderIcon fontSize="inherit"/>}
                                emptyIcon={<AcUnitIcon fontSize="inherit"/>}
                                max={10}
                            />
                            <p className={stylesMovie.FilmDescription}>Original name: {film.original_title} </p>
                            <p className={stylesMovie.FilmDescription}>Language: {film.original_language}</p>
                            <p className={stylesMovie.FilmDescription}>Realese date: {film.release_date}</p>
                            <p className={stylesMovie.FilmDescription}>Category: {film.genres.map(e => {
                                return (
                                    <p>{e.name}</p>
                                )
                            })}</p>
                            <p className={stylesMovie.Rating}>Rating: <span>{film.vote_average}</span> |
                                Votes: {film.vote_count}</p>
                            <p>Popualrity: {film.popularity}</p>
                            <p className={stylesMovie.FilmDescription}>Country: {film.production_countries.map(e => {
                                return (
                                    <p style={{
                                        backgroundColor: '#e0e0e0',
                                        padding: '6px',
                                        borderRadius: 4
                                    }}>{e.name}</p>
                                )
                            })}</p>
                            <p className={stylesMovie.FilmDescription}>Company: {film.production_companies.map(e => {
                                return (
                                    <p style={{
                                        backgroundColor: '#e0e0e0',
                                        padding: '6px',
                                        borderRadius: 4
                                    }}>{e.name}</p>
                                )
                            })}</p>
                            <p>Description: {film.overview}</p>
                        </div>
                    </div>
                    :
                    <div>
                        <Skeleton variant="rounded" width={500} height={750}/>
                        <div>
                            <Skeleton variant="rounded" width={460} height={35}/>
                            <Skeleton variant="rounded" width={150} height={25}/>
                            <Skeleton variant="rounded" width={360} height={35}/>
                            <Skeleton variant="rounded" width={175} height={25}/>
                            <Skeleton variant="rounded" width={150} height={25}/>
                            <Skeleton variant="rounded" width={250} height={25}/>
                            <Skeleton variant="rounded" width={175} height={25}/>
                            <Skeleton variant="rounded" width={150} height={25}/>
                            <Skeleton variant="rounded" width={250} height={25}/>
                            <Skeleton variant="rounded" width={175} height={25}/>
                            <Skeleton variant="rounded" width={150} height={25}/>
                            <Skeleton variant="rounded" width={460} height={65}/>
                        </div>
                    </div>
                }
            </MyModal>
            {uniqArray.length
                ?
                <div>
                    <h1>This is you're favorite movies  🫰 </h1>
                    <hr/>
                    <br/>
                    <div className={styles.Wrapper}>
                        {uniqArray.map((element, index) => {
                            return (
                                <div onClick={() => openMovie(element.id)} className={styles.item}>
                                    <img src={"https://image.tmdb.org/t/p/w500" + element.poster_path} alt=""/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div>
                    <h1>You don't have nothing here...  😢</h1>
                    <hr/>
                    <h4>Add movies to your favorites to watch them here....   😄</h4>
                </div>
            }
        </div>
    );
};

export default Favorite;