import React from "react";
import Chat from "./Chat";

function GlobalChat(){
    const messages =[{date_time:"9:00 pm",Upvote_count:20,Downvote_count:13,message:"Hi bro"},
    {date_time:"9:05 pm",message:"Hi bro",SentBy:"user"}]
    return(
        <Chat section={"Global"} messages={messages}/>
    )
}
export default GlobalChat