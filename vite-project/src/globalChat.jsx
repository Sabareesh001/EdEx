import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import io from "socket.io-client"
const api_host = import.meta.env.VITE_API_HOST
const socket = io(api_host)
function GlobalChat({sessionUser}){
  const [messages,setMessages]=useState([])
  useEffect(()=>{
    getGlobalMessages()
    console.log("making call again")
},[])
 
   const getGlobalMessages= ()=>{
        socket.emit("globalMessages")  
    }
useEffect(()=>{         
  socket.on("responseGlobalMessages",(data)=>{
  console.log(data)
  setMessages(data)
})
},[])

    
   
   

    return(
      <>
      <Chat getGlobalMessages={getGlobalMessages} sessionUser={sessionUser}  section={"Global"} messages={messages}> </Chat> 
      </>
      
       
    )
}
export default GlobalChat