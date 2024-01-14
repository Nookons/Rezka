import React, {useCallback, useEffect, useState} from 'react';
import {Button, Modal, Pagination, Rating, Skeleton, Typography} from "@mui/material";
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchMovies} from "../../stores/async/fetchMovies";
import FilmCards from "./FilmCards";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Home = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const [totalItems, setTotalItems] = useState(0);

    const [scrollY, setScrollY] = useState(0);

    const rootClasses = [styles.GoOnTop]

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    if (scrollY > 250) {
        rootClasses.push(styles.GoOnTopActive)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('pageInfo');
        const localPage = Number(storedData);

        if (storedData === null) {
            localStorage.setItem('pageInfo', 1);
        }

        if (localPage !== page) {
            setPage(localPage);
        }

        dispatch({ type: 'FETCH_MOVIES', payload: [] });

        if (localPage === page) {
            async function fetchData() {
                const response = await dispatch(fetchMovies({ page }));
                setTotalItems(response.total_results);
            }
            fetchData();
        }
    }, [page, dispatch, setTotalItems, setPage]);

    const changePage = (event, value) => {
        // Store the JSON string in local storage
        localStorage.setItem('pageInfo', value);

        dispatch({ type: 'FETCH_MOVIES', payload: [] });

        window.scrollTo({
            top: 0,
            // behavior: "smooth" // добавьте это свойство для плавного скролла
        });

        setData([]);
        setPage(value);
    };

    const goOnTop = useCallback((event) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // добавьте это свойство для плавного скролла
        });
    }, []);

    return (
        <div className={styles.Main}>
            <div className={rootClasses.join(' ')} onClick={goOnTop}>
                <KeyboardArrowUpIcon />
            </div>
            {movies.length
                ?
                    <FilmCards movies={movies} />
                :
                <div className={styles.Wrapper}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <Skeleton key={index} variant="rounded" width={350} height={580} />
                    ))}
                </div>
            }
            {movies ? <Pagination style={{margin: 28}} count={totalItems / 40} page={page} onChange={changePage}
                                  variant="outlined" shape="rounded"/> : null}
        </div>
    );
};

export default Home;