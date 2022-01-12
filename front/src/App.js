import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";


function App(props) {

    return (<>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </>
    );
}

export default App;