import {Common, ZIMKitManager} from "@zegocloud/zimkit-react"
import '@zegocloud/zimkit-react/index.css'
import { useEffect, useState } from 'react'

const id = Math.floor(Math.random()*1000)

const VideoChat = () => {
  const [state,setState] = useState({
    appConfig:{
      appID: import.meta.env.VITE_APP_ID,
      serverSecret: import.meta.env.VITE_APP_SERVERSECRET
    },
    // userID and userName is a string of 1 to 32 characters
    userInfo:{
         userID: `nahida${id}`,
         userName:`nahida${id}`,
         userAveterUrl:''
    }
  })

  useEffect(()=>{
     const init = async()=>{
       const zimkit = new ZIMKitManager();
       const token = zimkit.generateKitTokenForTest(state.appConfig.appID,state.appConfig.serverSecret,
        state.userInfo.userID)
       await zimkit.init(state.appConfig.appID)
       await zimkit.connectUser(state.userInfo, token)
     }

     init()
  },[])
  return (
    <div>
       welcome this chat app 
       <Common></Common>
    </div>
  );
};

export default VideoChat;
