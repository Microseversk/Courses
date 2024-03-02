import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from "./store/store";
import {Router} from "./components/router/Router";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <BrowserRouter>
                <Router/>
        </BrowserRouter>
    </Provider>
);
