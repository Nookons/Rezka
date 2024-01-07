export const defaultStateMovies = {
    movies: [],
    comments: [],
    null: []
}

const FETCH_MOVIES      = "FETCH_MOVIES"
const FETCH_COMMENTS    = "FETCH_COMMENTS"
const ADD_LIKE          = "ADD_LIKE"
const ADD_CHILD         = "ADD_CHILD"

export const movieReducer = (state = defaultStateMovies, action) => {
    switch (action.type) {
        case "ADD_COMMENT":
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case "ADD_LIKE":
            // Предположим, что action.payload содержит id комментария и обновленные данные по лайкам.
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.id ? { ...comment, likes: action.payload.likes, userLike: [action.payload.userlike] } : comment
                )
            };
        case "ADD_CHILD":
            // Предположим, что action.payload содержит id комментария и обновленные данные по лайкам.
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.fatherId ? { ...comment, child: comment.child ? [...comment.child, action.payload] : [action.payload] } : comment
                )
            };
        case "FETCH_MOVIES":
            return {
                ...state,
                movies: action.payload // Если нужно полностью заменить массив
                // movies: state.movies.concat(action.payload) // Если нужно добавить данные к существующим
            };
        case "FETCH_COMMENTS":
            return {
                ...state,
                comments: action.payload // Если нужно полностью заменить массив
                // comments: state.comments.concat(action.payload) // Если нужно добавить данные к существующим
            };
        case "ADD_MOVIES":
            return {
                ...state,
                movies: [...state.movies, action.payload]
            };
        case "REMOVE_MOVIES":
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.payload)
            };
        default:
            return state;
    }
};

export const addMoviesAction    = (payload) => ({type: FETCH_MOVIES, payload})
export const addCommentsAction  = (payload) => ({type: FETCH_COMMENTS, payload})
export const addLikeAction      = (payload) => ({type: ADD_LIKE, payload})
export const addChildAction     = (payload) => ({type: ADD_CHILD, payload})