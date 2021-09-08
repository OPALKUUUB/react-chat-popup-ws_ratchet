import React, { useEffect } from 'react';
import { addResponseMessage, Chat } from 'react-chat-popup';
import koala from './koala.jpg';

var socket = new WebSocket('ws://localhost:8089');
socket.onopen = () => {
  console.log("connecting websocket");
}

function App() {

  useEffect(() => {
    // addResponseMessage("test");
    socket.onmessage = e => {
      // console.log(e.data);
      addResponseMessage(e.data);
    }
  }, [])

  return (
    <div className="App">
      <Chat
        handleNewUserMessage={(e) => socket.send(e)}
        title="My new awesome"
        profileAvatar={koala}
      />
    </div>
  );
}

export default App;
