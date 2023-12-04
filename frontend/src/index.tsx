import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ReactNotifications} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ReactNotifications/>
        <App/>
    </BrowserRouter>
);