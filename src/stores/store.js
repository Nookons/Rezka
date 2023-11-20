import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {favoriteReducer} from "./favoriteReducer";
import {movieReducer} from "./moviesReducer";

const rootReducer = combineReducers({
    movies: movieReducer,
    favorite: favoriteReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))