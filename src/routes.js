import {HOME_ROUTE, FAVORITE_ROUTE, FILM_ROUTE, SIGN_IN_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import Store from "./pages/Favorite/Favorite"
import FilmPage from "./pages/FilmPage/FilmPage";
import SignIn from "./pages/Sign/SignIn/SignIn";

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
    },
    {
        path: SIGN_IN_ROUTE,
        Component: SignIn,
        label: 'FilmPrivate',
    },
]



