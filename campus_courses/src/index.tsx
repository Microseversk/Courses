import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {Router} from "./components/router/Router";
import {Provider} from "react-redux";
import {Store} from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={Store}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={Router}/>
        </QueryClientProvider>
    </Provider>
);
