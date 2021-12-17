import React from 'react';
import { BrowserRouter, Route, Switch, Link, Router } from 'react-router-dom'

import Home from './pages/Home';
import QrCode from './pages/QrCode';
import DashBoard from './pages/DashBoard/dashboard';
import NumOp from './pages/NumOp';
import Celula from './pages/Celulas'
import CelulaMaq from './pages/Celulas/Maq.js'



export default function Rotas() {
    return (
        // <BrowserRouter>
        //     {/* <Navbar /> */}
        //     <Sidebar />

        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/qrcode" component={QrCode} />
            <Route path="/dash" component={DashBoard} />
            <Route path="/op" component={NumOp} />
            <Route exact path="/celula" component={Celula} />
            <Route path="/celula/:id" component={CelulaMaq} />

           
        </Switch>
        // </BrowserRouter >
    );
}