import React from 'react';
// import { ZIMKit } from '@zegocloud/zimkit-rn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()

    const appConfig = {
        appID: 0, // The AppID you get from ZEGOCLOUD Admin Console.
        appSign: '', // The AppSign you get from ZEGOCLOUD Admin Console.
    };

    useEffect(() => {
        ZIMKit.init(appConfig.appID, appConfig.appSign);
        ZIMKit.connectUser({
            userID: '01', // Your ID as a user.  
            userName: 'Nahida' // Your name as a user.
        }, '')
            .then(() => {
                // Implement your event handling logic after logging in successfully. 
                // Navigate to the In-app Chat Kit page.
                navigate('/');
            });
    }, []);

    return (
        <div>
          this login pages 
          <h1>Please login to here </h1>
        </div>
    );
};

export default LoginPage;