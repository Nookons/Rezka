import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {favoriteReducer} from "./favoriteReducer";
import {movieReducer} from "./moviesReducer";
import {userReducer} from "./userReducer";

const rootReducer = combineReducers({
    movies: movieReducer,
    favorite: favoriteReducer,
    user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))