import axios from "axios";
import {addMoviesAction} from "../moviesReducer";

export const fetchMovies = ({page}) => {

    return async function (dispatch) {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=411d08d89a4569fb1b50aec07ee6fb72&page=' + page)
        dispatch(addMoviesAction(response.data.results))
        return response.data
    }
};