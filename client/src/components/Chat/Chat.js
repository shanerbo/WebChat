import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

const Chat = ({ location }) => {
      const [name, setName,] = useState('');
      const [room, setRoom,] = useState('');
      const [message, setMessage,] = useState('');
      const [messages, setMessages,] = useState([]);
      const ENDPOINT = "localhost:5000";
      let socket;

      useEffect(() => {
            const { name, room } = queryString.parse(location.search);
            console.log(name, room);

            socket = io(ENDPOINT);

            setName(name);
            setRoom(room);

            console.log(socket);
            socket.emit("join", { name: name, room: room }, (error) => {
                  if (error) {
                        alert(error);
                  }
            });
      }, [ENDPOINT, location.search]);

      useEffect(() => {
            socket.on("message", (message) => {
                  setMessages([...messages, message]);
            });
            return () => {
                  socket.emit("disconnect");
                  socket.off();
            }
      }, [messages])

      const sendMessage = (event) => {
            event.preventDefault();
            if (message) {
                  socket.emit("sendMessage", message, () => setMessage(""));
            }
      }

      console.log(message, messages);

      return (
            <div className="outerContainer">
                  <div className="container">
                        <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === "Enter" ? setMessage(event) : null} />
                  </div>
            </div>
      )
}

export default Chat;