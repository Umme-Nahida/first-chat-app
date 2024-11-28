import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;
const Chat = () => {
    const { search } = useLocation()
    console.log(search)
    const { name, room } = queryString.parse(search);
    const [messages,setMessages] = useState([])
    console.log(name, room)

    useEffect(() => {
        socket = io('http://localhost:3000')

        // to send user info in server side
        socket.emit("join", { name, room }, (error) => {
            if (error) {
                // alert(error)
                console.log(error)
            }
        })
        
        //  welcome msg by admin 
        socket.on("message", (message)=>{
            setMessages((existingMessage)=> [...existingMessage, message])
        })
    }, [])

    // get message from input & send server side
    const sendMessage = (e)=>{
        console.log(e.target.value)
        console.log(e.key)
        if(e.key === 'Enter' && e.target.value){
            console.log('enter key and value is get ' , e.key, e.target.value)
            socket.emit("message", e.target.value)
            e.target.value = '';
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='w-[400px] mx-auto min-h-20 flex flex-col items-center justify-between border border-gray-300 bg-gray-300'>
                <div className="chat-head w-full bg-blue-600 text-white text-xl flex items-center justify-between pl-5">
                    <div className="room">sports  </div>
                    <button className='py-2 px-2 bg-emerald-400'>X</button>
                </div>
                <div className="chat-box w-full ">
                    {messages.map((message,index)=>(
                    <div key={index} className="text-left p-2">{message.user}: {message.text} </div>
                       
                    ))}
                    <input  type="text" name="message" onKeyDown={sendMessage} className='px-3 py-2 w-full focus:outline-dotted border border-black ' placeholder='message' />
                </div>
            </div>
        </div>
    );
};

export default Chat;