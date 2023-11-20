export const defaultStateMovies = {
    movies: [],
    null: []
}

const FETCH_MOVIES = "FETCH_MOVIES"

export const movieReducer = (state = defaultStateMovies, action) => {
    switch (action.type) {
        case "FETCH_MOVIES":
            return {...state, movies: [...action.payload]}
        case "ADD_MOVIES":
            return {...state, movies: [...state.movies, action.payload]}
        case "REMOVE_MOVIES":
            return {...state, movies: state.movies.filter(barrel => barrel.id !== action.payload)}
        default:
            return state
    }
}

export const addMoviesAction = (payload) => ({type: FETCH_MOVIES, payload})