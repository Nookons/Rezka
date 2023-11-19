import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
};

export default App;