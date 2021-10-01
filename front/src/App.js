import React, {
    useState
} from "react";
import socketIOClient from "socket.io-client";

import "./App.css";

const socket = socketIOClient("http://localhost:3005");

function App(props) {
    const [infoReb, setInfo] = useState("");

    socket.on("infoEvent", (receivedInfo) => {
        setInfo(receivedInfo);
        console.log(infoReb)
    });

    function emitInfoToAll() {
        // const socket = socketIOClient(this.state.serverURL)
        socket.emit("infoEvent", "hello realtime");
    }

    return (<>
        <div className="App" >
            <div className="box" >
                <div className="title" >
                    <a> TEMPO: </a></div >
                <div className="dado" > {infoReb} seg </div>
            </div>
        </div>
    </>
    );
}

export default App;