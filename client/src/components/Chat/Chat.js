import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';
let socket;

const Chat = ({ location }) => {
      const [name, setName,] = useState('');
      const [room, setRoom,] = useState('');
      const [message, setMessage,] = useState('');
      const [messages, setMessages,] = useState([]);
      const ENDPOINT = "localhost:5000";

      useEffect(() => {
            const { name, room } = queryString.parse(location.search);
            console.log(name, room);

            socket = io(ENDPOINT);

            setName(name);
            setRoom(room);

            socket.emit("join", { name: name, room: room }, (error) => {
                  if (error) {
                        alert(error);
                  }
            });
            return () => {
                  socket.emit("disconnect");
                  socket.off();
            }
      }, [ENDPOINT, location.search]);

      useEffect(() => {
            socket.on("message", (message) => {
                  console.log(message);
                  setMessages([...messages, message]);
            })

      }, [messages]);

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
                        <InfoBar room={room} />
                        <Messages messages={messages} name={name}></Messages>
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                  </div>
            </div>
      );
}


export default Chat;