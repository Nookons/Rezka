import React from 'react';
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {styled} from "@mui/material/styles";
import {Rating, Slider, Stack} from "@mui/material";
import styles from './Description.module.css'
import WhatshotIcon from '@mui/icons-material/Whatshot';


const Description = ({film}) => {

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    })

    const popularity = film.popularity

    return (
        <div className={styles.Main}>
            {
                film
                    ?
                    <div className={styles.DescriptionWrapper}>
                        <h1>{film.title}</h1>
                        <h5>{film.tagline}</h5>
                        <StyledRating
                            name="customized-color"
                            defaultValue={film.vote_average}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            icon={<WhatshotIcon fontSize="inherit"/>}
                            emptyIcon={<AcUnitIcon fontSize="inherit"/>}
                            max={10}
                        />
                        <p className={styles.FilmDescription}>Original name: <span>{film.original_title}</span> </p>
                        <p className={styles.FilmDescription}>Language: <span>{film.original_language}</span></p>
                        <p className={styles.FilmDescription}>Realese date: <span>{film.release_date}</span></p>
                        <p className={styles.FilmDescription}>Category: {film.genres.map(e => {
                            return (
                                <span>{e.name}</span>
                            )
                        })}</p>
                        <p className={styles.FilmDescription}>Rating: <span>{film.vote_average}</span> |
                            Votes: {film.vote_count} <AddCircleOutlineIcon /></p>
                        <p className={styles.FilmDescription}>Popualrity:
                            <span style={{ minWidth: '325px'}}>
                                <Stack spacing={2} direction="row"  alignItems="center">
                                    {
                                        popularity >= 2000
                                            ?   <AcUnitIcon style={{ color: '#272829',}} />
                                            :   <AcUnitIcon style={{ color: '#272829',}}/>
                                    }
                                    <Slider style={{color: '#272829'}}  aria-label="Volume" value={popularity} max={2000} />
                                    {
                                        popularity >= 1000
                                            ?   <WhatshotIcon style={{ color: '#ff3d3d',}} />
                                            :   <WhatshotIcon style={{ color: '#272829',}}/>
                                    }
                                </Stack>
                            </span>
                        </p>


                        <p className={styles.FilmDescription}>Country: {film.production_countries.map(e => {
                            return (
                                <span>{e.name}</span>
                            )
                        })}</p>
                        <p className={styles.FilmDescription}>Company: {film.production_companies.map(e => {
                            return (
                                <span>{e.name}</span>
                            )
                        })}</p>
                    </div>
                    : null
            }
        </div>
    );
};

export default Description;