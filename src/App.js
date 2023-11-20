import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer/Footer";
import {Provider} from "react-redux";
import {store} from "./stores/store";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
                <Footer />
            </BrowserRouter>
        </Provider>
    );
};

export default App;