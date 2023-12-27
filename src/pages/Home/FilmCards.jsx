import React, {useState} from 'react';
import styles from "./Home.module.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import {styled} from "@mui/material/styles";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {FILM_ROUTE} from "../../utils/consts";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const FilmCards = ({movies}) => {
    const navigate = useNavigate();

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
            color: '#ff3d47',
        },
    })

    async function getFilm(id) {
        navigate(FILM_ROUTE + '?_'+ id)
    }

    return (
        <div className={styles.Wrapper}>
            {movies.map((element, index) => {

                return (
                    <div onClick={() => getFilm(element.id)} className={styles.Item}>
                        <div className={styles.ItemIndex}>
                            <h4>{index + 1}</h4>
                        </div>
                        <img src={"https://image.tmdb.org/t/p/w500" + element.poster_path} alt=""/>
                        <h4>{element.title}</h4>
                        <StyledRating
                            name="customized-color"
                            defaultValue={element.vote_average}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            icon={<LocalFireDepartmentIcon fontSize="inherit"/>}
                            emptyIcon={<AcUnitIcon fontSize="inherit"/>}
                            max={10}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default FilmCards;