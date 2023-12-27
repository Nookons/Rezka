import React, {useEffect, useState} from 'react';
import {Button, Modal, Pagination, Rating, Skeleton, Typography} from "@mui/material";
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../stores/async/fetchMovies";
import FilmCards from "./FilmCards";


const Home = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [totalItems, setTotalItems] = useState(0);

    const [scrollY, setScrollY] = useState(0);

    console.log(movies);

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

    return (
        <div className={styles.Main}>
            {movies
                ?
                    <FilmCards movies={movies} />
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