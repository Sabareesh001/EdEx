import React from "react";
import Chat from "./Chat";

function MyCollegeChat(){
    const messages =[{date_time:"9:00 pm",like_count:18,message:"All students Assemble here"},
    {date_time:"9:05 pm",message:"Where ?",SentBy:"user"}]
    return(
        <Chat section={"College"} messages={messages}/>
    )
}
export default MyCollegeChat