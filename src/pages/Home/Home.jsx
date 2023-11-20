import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, Pagination, Rating, Skeleton, Typography} from "@mui/material";
import styles from './Home.module.css'
import {styled} from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MyModal from "./MyModal";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../stores/async/fetchMovies";


const Home = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [film, setFilm] = useState();
    const [trailer, setTrailer] = useState();
    const itemsPerPage = 20; // Change before realize to 20

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    if (scrollY > 250) {
        console.log('go on top')
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isModal, setIsModal] = useState(false);
    const [isTrailer, setIsTrailer] = useState(false);

    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
       async function get () {
           const response = await dispatch(fetchMovies({page}))
           setTotalItems(response.total_results)
       }
        get()
    }, [page]);

    const changePage = (event, value) => {
        window.scrollTo({
            top: 0,
            //behavior: "smooth" // добавьте это свойство для плавного скролла
        });
        setData([])
        setPage(value)
    }


    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    });

    async function getFilm(id) {
        setIsModal(true)
        setFilm(null)
        const responseTrailer = await axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=411d08d89a4569fb1b50aec07ee6fb72')
        const response = await axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=411d08d89a4569fb1b50aec07ee6fb72')
        setTrailer(responseTrailer.data.results)
        setFilm(response.data)
    }

    function watchTrailer() {
        setIsModal(false)
        setIsTrailer(true)
    }

    function addToFavorite(film) {
        console.log(film)
        dispatch({type: "ADD_FAVORITE", payload: film})
    }

    return (
        <div className={styles.Main}>
            <MyModal visible={isModal} setVisible={setIsModal}>
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
                            <p className={styles.FilmDescription}>Original name: {film.original_title} </p>
                            <p className={styles.FilmDescription}>Language: {film.original_language}</p>
                            <p className={styles.FilmDescription}>Realese date: {film.release_date}</p>
                            <p className={styles.FilmDescription}>Category: {film.genres.map(e => {
                                return (
                                    <p>{e.name}</p>
                                )
                            })}</p>
                            <p className={styles.Rating}>Rating: <span>{film.vote_average}</span> |
                                Votes: {film.vote_count}</p>
                            <p>Popualrity: {film.popularity}</p>
                            <p className={styles.FilmDescription}>Country: {film.production_countries.map(e => {
                                return (
                                    <p style={{
                                        backgroundColor: '#e0e0e0',
                                        padding: '6px',
                                        borderRadius: 4
                                    }}>{e.name}</p>
                                )
                            })}</p>
                            <p className={styles.FilmDescription}>Company: {film.production_companies.map(e => {
                                return (
                                    <p style={{
                                        backgroundColor: '#e0e0e0',
                                        padding: '6px',
                                        borderRadius: 4
                                    }}>{e.name}</p>
                                )
                            })}</p>
                            <p>Description: {film.overview}</p>
                            <Button onClick={() => addToFavorite(film)} variant="contained">Add to favorite</Button>
                            <Button onClick={watchTrailer} variant="contained">Watch Trailer</Button>
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

            <MyModal visible={isTrailer} setVisible={setIsTrailer} style={{zIndex: 5}}>
                {trailer
                    ?
                    <div>
                        {trailer.map(element => {
                            switch (element.name) {
                                case "Official Trailer":
                                    return (
                                        <iframe
                                            width="1195vw"
                                            height="600dvh"
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
                    </div>
                    : null}
            </MyModal>
            {movies
                ?
                <div className={styles.Wrapper}>
                    {movies.map((element, index) => {

                        return (
                            <div onClick={() => getFilm(element.id)} className={styles.Item}>
                                <div className={styles.ItemIndex}>
                                    <h2>{index + 1}</h2>
                                </div>
                                <img src={"https://image.tmdb.org/t/p/w500" + element.poster_path} alt=""/>
                                <h4>{element.title}</h4>
                                <h4>Relise: <span>{element.release_date}</span></h4>
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={element.vote_average}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={1}
                                    icon={<FavoriteBorderIcon fontSize="inherit"/>}
                                    emptyIcon={<AcUnitIcon fontSize="inherit"/>}
                                    max={10}
                                />
                            </div>
                        )
                    })}
                </div>
                :
                <div className={styles.Wrapper}>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                    <Skeleton variant="rounded" width={360} height={596}/>
                </div>
            }
            {movies ? <Pagination style={{margin: 28}} count={totalItems / 40} page={page} onChange={changePage}
                                  variant="outlined" shape="rounded"/> : null}
        </div>
    );
};

export default Home;