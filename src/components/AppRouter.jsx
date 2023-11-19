import React from 'react';
import {Route, Routes, Outlet} from 'react-router-dom'
import {privateRoutes, publicRoutes, userRoutes} from "../routes";

const AppRouter = () => {

    return (
        <Routes>
            {publicRoutes.map( ({path, Component}, index) =>
                <Route key={index} path={path} Component={Component} exact={true}/>
            )}
        </Routes>
    )
};

export default AppRouter;