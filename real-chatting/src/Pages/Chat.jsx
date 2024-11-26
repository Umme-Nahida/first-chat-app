import React, { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;
const Chat = () => {
    const {search} = useLocation()
    console.log(search)
    const {name,room}= queryString.parse(search);
    console.log(name,room)

    useEffect(()=>{
        socket = io('http://localhost:3000')
        
        // to send user info in server side
        socket.emit("join",{name,room}, (error)=>{
               if(error){
                 alert(error)
               }
        })
    },[])



    return (
        <div className='chat'>
             <div className="chat-head">
                <div className="room">sports  </div>
             </div>
             <div className="chat-box">
                <div className="chat-message">Text message</div>
                <input type="text" name="message" placeholder='message' />
             </div>
        </div>
    );
};

export default Chat;