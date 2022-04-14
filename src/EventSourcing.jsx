import React, {useEffect, useState} from 'react';
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    },[])

    const subscribe = async () => {
         const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = function (event) {
            console.log(event.data)
        }
    }

    const onChangeHandler = (e) => {
       const inputValue = e.target.value
        setValue(inputValue)
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }

    return (
        <div className="center">
        <div>
            <div className="form">
                <input type="text" value={value} onChange={onChangeHandler}/>
                <button onClick={sendMessage}>Send</button>
            </div>
            <div className="messages">
                {messages?.map(message =>
                <div className="message" key={message.id}>
                    {message.message}
                </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default EventSourcing;
