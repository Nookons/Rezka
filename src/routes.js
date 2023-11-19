import {HOME_ROUTE, STORE_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store"

// routes for users
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
    {
        path: STORE_ROUTE,
        Component: Store,
        label: 'Home',
    },
]



