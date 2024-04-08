import React from "react";
import Chat from "./Chat";

function MyCollegeChat(){
    const messages =[{date_time:"9:00 pm",Upvote_count:18,Downvote_count:3,message:"All students Assemble here"},
    {date_time:"9:05 pm",message:"Where ?",SentBy:"user"}]
    return(
        <Chat section={"College"} messages={messages}/>
    )
}
export default MyCollegeChat