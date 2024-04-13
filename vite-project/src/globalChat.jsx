import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import io from "socket.io-client"

const api_host = import.meta.env.VITE_API_HOST
function GlobalChat({sessionUser}){
  const socket = io.connect("http://localhost:3000")
  useEffect(()=>{
     socket.emit("globalMessages",{})
  })
 
    const [messages,setMessages]=useState([])
   const getGlobalMessages= ()=>{
         axios.get(`${api_host}/globalMessages`).then(async (response)=>{
            console.log(response.data)
             setMessages(response.data.map((data)=>(data)))
        })
    }
   
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       getGlobalMessages()
    //     }, 100);
    
    //     return () => clearInterval(interval);
    //   }, []);
    useEffect(()=>{
        getGlobalMessages()
    },[])

    return(
        <Chat socket={socket} getGlobalMessages={getGlobalMessages} sessionUser={sessionUser}  section={"Global"} messages={messages}/>
    )
}
export default GlobalChat