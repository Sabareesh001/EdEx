import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";

function GlobalChat({sessionUser}){
   
    const [messages,setMessages]=useState([])
    function getGlobalMessages(){
        axios.get('http://localhost:3000/globalMessages').then((response)=>{
            console.log(response.data)
            setMessages(response.data.map((data)=>(data)))
        })
    }
    useEffect(()=>{
        getGlobalMessages()
        
    },[])
    const messages1 =[{date_time:"9:00 pm",username:"Shekar",Upvote_count:20,Downvote_count:13,message:"Hi bro"},
    {date_time:"9:05 pm",message:"Hi bro",SentBy:"user"}]
    return(
        <Chat sessionUser={sessionUser}  section={"Global"} messages={messages}/>
    )
}
export default GlobalChat