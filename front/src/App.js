import React, { useState } from 'react';
import socketIOClient from 'socket.io-client'

import './App.css';

const socket = socketIOClient("http://localhost:3005")

function App(props) {

  const [infoReb, setInfo] = useState("")

  socket.on('infoEvent', (receivedInfo) => {
    setInfo(receivedInfo)
  })

  function emitInfoToAll() {
    // const socket = socketIOClient(this.state.serverURL)
    socket.emit('infoEvent', 'hello realtime')
  }


  return (
    <>
      <div className="App">
        <div>
          <button onClick={() => emitInfoToAll()}>Send information to all connected clients.</button>
        </div>
        <br />
        <div className="box">
          <div className="titulo">
            <p>TEMPO:</p>
          </div>

          <div className="sub-titulo">
            {infoReb}
          </div>
        </div>
      </div>
    </>
  )

}

export default App;
