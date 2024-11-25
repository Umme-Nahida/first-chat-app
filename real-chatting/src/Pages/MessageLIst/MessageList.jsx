import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MessageList = () => {

    const location = useLocation();
    const navigate = useNavigate();
  
    const { conversationID, conversationName, conversationType } = location.state || {};
    return (
        <div>
            <h1>Message List Page</h1>
            <p>Conversation ID: {conversationID}</p>
            <p>Conversation Name: {conversationName}</p>
            <p>Conversation Type: {conversationType}</p>
            <button onClick={() => navigate(-1)}>Go Back</button>

        </div>
    );
};

export default MessageList;