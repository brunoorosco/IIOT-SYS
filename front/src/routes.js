import React from 'react';
import { BrowserRouter, Route, Switch, Link, Router } from 'react-router-dom'

import Navbar from './component/navbar'
import Home from './pages/Home';
import QrCode from './pages/QrCode';
import DashBoard from './pages/DashBoard/dashboard';
import NumOp from './pages/NumOp';
import Celula from './pages/Producao'
import Sidebar from './component/Sidebar'

export default function Rotas() {
    return (
        // <BrowserRouter>
        //     {/* <Navbar /> */}
        //     <Sidebar />

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/qrcode">
                    <QrCode />
                </Route>
                <Route path="/dash">
                    <DashBoard />
                </Route>
                <Route path="/op">
                    <NumOp />
                </Route>
                <Route path="/celula">
                    <Celula />
                </Route>
                {/* <Route path="/sidebar">
                        <Sidebar />
                    </Route> */}
            </Switch>
        // </BrowserRouter >
    );
}