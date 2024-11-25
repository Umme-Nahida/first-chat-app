import React, { useEffect, useState } from 'react';
import { ZIM } from 'zego-zim-web';


const ZimComponent = ({ appID, userInfo, initialToken }) => {
  const [zim, setZim] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionState, setConnectionState] = useState(null);
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    // Initialize ZIM instance
    const initializeZim = () => {
      ZIM.create({ appID }); // Ensure the appID is valid and numeric
      const instance = ZIM.getInstance();
      if (instance) {
        setZim(instance);
      } else {
        console.error('Failed to create or retrieve ZIM instance.');
      }
    };

    initializeZim();
  }, [appID]);

  useEffect(() => {
    if (!zim) return;

    // Error Listener
    const handleError = (zim, errorInfo) => {
      console.error('Error:', errorInfo.code, errorInfo.message);
    };
    zim.on('error', handleError);

    // Connection State Listener
    const handleConnectionStateChange = (zim, { state, event, extendedData }) => {
      console.log('Connection State Changed:', state, event, extendedData);
      setConnectionState({ state, event, extendedData });
      if (state === 0 && event === 3) {
        // Re-login if logged out
        zim.login(userInfo, token).catch((err) => console.error('Re-login failed:', err));
      }
    };
    zim.on('connectionStateChanged', handleConnectionStateChange);

    // Peer Message Listener
    const handlePeerMessage = (zim, { messageList, fromConversationID }) => {
      console.log('Received Peer Message:', messageList, fromConversationID);
      setMessages((prev) => [...prev, { messageList, fromConversationID }]);
    };
    zim.on('receivePeerMessage', handlePeerMessage);

    // Token Expiration Listener
    const handleTokenWillExpire = (zim, { second }) => {
      console.log('Token Will Expire in Seconds:', second);
      zim.renewToken(token)
        .then(({ token: newToken }) => {
          console.log('Token Renewed Successfully:', newToken);
          setToken(newToken);
        })
        .catch((err) => console.error('Token Renewal Failed:', err));
    };
    zim.on('tokenWillExpire', handleTokenWillExpire);

    return () => {
      zim.off('error', handleError);
      zim.off('connectionStateChanged', handleConnectionStateChange);
      zim.off('receivePeerMessage', handlePeerMessage);
      zim.off('tokenWillExpire', handleTokenWillExpire);
    };
  }, [zim, token, userInfo]);

  const handleLogin = () => {
    if (!zim) return;
    zim
      .login(userInfo, token)
      .then(() => console.log('Login successful.'))
      .catch((err) => console.error('Login failed:', err));
  };

  const sendMessage = (toConversationID, messageText) => {
    if (!zim) return;

    const conversationType = 0; // One-on-one chat
    const config = { priority: 1 }; // Low priority by default
    const messageTextObj = { type: 1, message: messageText, extendedData: '' };
    const notification = {
      onMessageAttached: (message) => {
        console.log('Message is being sent:', message);
      },
    };

    zim
      .sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
      .then(({ message }) => {
        console.log('Message sent successfully:', message);
      })
      .catch((err) => console.error('Failed to send message:', err));
  };

  return (
    <div>
      <h1>ZIM Chat Application</h1>
      <button onClick={handleLogin}>Login</button>

      <div>
        <h2>Connection State:</h2>
        <p>State: {connectionState?.state}</p>
        <p>Event: {connectionState?.event}</p>
        <p>Extended Data: {JSON.stringify(connectionState?.extendedData)}</p>
      </div>

      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              From: {msg.fromConversationID} - Message: {JSON.stringify(msg.messageList)}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Send Message:</h2>
        <button onClick={() => sendMessage('peerUserID', 'Hello!')}>Send "Hello!"</button>
      </div>
    </div>
  );
};

export default ZimComponent;
