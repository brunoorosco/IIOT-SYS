import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import socketIOClient from "socket.io-client";
import api from '../../services/api'
import './styles.css';

const socket = socketIOClient("http://localhost:3005");

export default function Home(props) {
    const [id, setId] = useState('');
    const history = useHistory();

    const [infoReb, setInfo] = useState("");

    socket.on("infoEvent", (receivedInfo) => {
        setInfo(receivedInfo);
        console.log(infoReb)
    });

    function emitInfoToAll() {
        // const socket = socketIOClient(this.state.serverURL)
        socket.emit("infoEvent", "hello realtime");
    }

    return (

        <div className="" >
            <div className="box" >
                <div className="title" >
                    <a> TEMPO: </a></div >
                <div className="dado" > {infoReb} seg </div>
            </div>
        </div>
    );

}