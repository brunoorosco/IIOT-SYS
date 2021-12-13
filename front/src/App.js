import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";


function App(props) {

    return (<>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </>
    );
}

export default App;