import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const WebSock = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')

    const onChangeHandler = (e) => {
        const inputValue = e.target.value
        setValue(inputValue)
    }

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message =  JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('Socket closed')
        }
        socket.current.onerror = () => {
            console.log('Socket error')
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        type="text"
                        placeholder="Please enter your name"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <button onClick={connect}>Enter</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <div className="form">
                    <input type="text" value={value} onChange={onChangeHandler}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {messages?.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                            ? <div className="connection_message">
                                    <div>Username {mess.username} get connected</div>
                              </div>
                            : <div className="message">
                                <div>{mess.username}. {mess.message}</div>
                              </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;
