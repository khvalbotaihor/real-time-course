import React, {useState} from 'react';

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const onChangeHandler = (e) => {
       const inputValue = e.target.value
        setValue(inputValue)
    }

    return (
        <div className="center">
        <div>
            <div className="form">
                <input type="text" value={value} onChange={onChangeHandler}/>
                <button>Send</button>
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

export default LongPulling;
