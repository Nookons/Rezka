import {HOME_ROUTE, FAVORITE_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import Store from "./pages/Favorite/Favorite"

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



