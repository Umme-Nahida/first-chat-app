import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')


    return (
        <div>
           <div>
             <input type="text" className='border px-2 py-2 mx-2' name="name" placeholder='name ' onChange={(e)=>setName(e.target.value)} />
             <input type="text" className='border px-2 py-2 mx-2' name="name" placeholder='room ' onChange={(e)=>setRoom(e.target.value)} />
             <Link to={`/chat?name=${name}&room=${room}`}>
                <button className='py-2 px-5 bg-slate-400'>Join here</button>
             </Link>
           </div>
           
        </div>
    );
};

export default Join;