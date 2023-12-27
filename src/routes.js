import {HOME_ROUTE, FAVORITE_ROUTE, FILM_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import Store from "./pages/Favorite/Favorite"
import FilmPage from "./pages/FilmPage/FilmPage";

// routes for users
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
    {
        path: FAVORITE_ROUTE,
        Component: Store,
        label: 'Home',
    },
]

export const privateRoutes = [
    {
        path: FILM_ROUTE,
        Component: FilmPage,
        label: 'FilmPrivate',
    }
]



