import React, { useEffect, useState } from 'react';

const Chat = () => {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className='w-[400px] mx-auto min-h-20 flex flex-col items-center justify-between border border-gray-300 bg-gray-300'>
                <div className="chat-head w-full bg-blue-600 text-white text-xl flex items-center justify-between pl-5">
                    <div className="room">sports Online  </div>
                    <button className='py-2 px-2 bg-emerald-400'>X</button>
                </div>
                <div className="chat-box w-full ">
                    <input  type="text" name="message"  className='px-3 py-2 w-full focus:outline-dotted border border-black ' placeholder='message' />
                </div>
            </div>
        </div>
    );
};

export default Chat;