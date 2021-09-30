import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

import './App.css';

const socket = socketIOClient("http://localhost:3005")

class App extends Component {
  

  constructor() {
    super()

    this.state = {
      serverURL: "http://localhost:3005",
      informationReceived: ' Nothing yet! you should click on the button'
    }

     //  const socket = socketIOClient(this.state.serverURL)
    socket.on('infoEvent', (receivedInfo) => {
      this.setState({
        informationReceived: receivedInfo
      })
    })
  }

  emitInfoToAll = () => {
  
    //  const socket = socketIOClient(this.state.serverURL)
    socket.emit('infoEvent', 'hello realtime')
  }

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={() => this.emitInfoToAll()}>Send information to all connected clients.</button>
        </div>
        <br />
        {
          this.state.informationReceived
        }

      </div>
    );
  }
}

export default App;
