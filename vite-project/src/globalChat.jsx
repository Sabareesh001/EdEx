import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";

function GlobalChat({sessionUser}){
   
    const [messages,setMessages]=useState([])
   const getGlobalMessages=async()=>{
        await axios.get('http://localhost:3000/globalMessages').then((response)=>{
            console.log(response.data)
            setMessages(response.data.map((data)=>(data)))
        })
    }
    useEffect(()=>{
        getGlobalMessages()
    },[])

    return(
        <Chat getGlobalMessages={getGlobalMessages} sessionUser={sessionUser}  section={"Global"} messages={messages}/>
    )
}
export default GlobalChat