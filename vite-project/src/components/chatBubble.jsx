import React, { useEffect, useState } from "react";
import './chatBubble.css'
import Profile from "../assets/icons/man.png"
import UpVote from "../assets/icons/dropup-arrow.png"
import RedUpVote from "../assets/icons/dropup-arrow-red.png"
import DownVote from "../assets/icons/dropdown-arrow.png"
import RedDownVote from "../assets/icons/dropdown-arrow-red.png"
function ChatBubble({profile_pic,Upvote_count,Downvote_count,message,date_time,style,sentby}){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    const [chatBubbleColor,setChatBubbleColor]=useState("white")
    const [Upvote,setUpvote]=useState(UpVote)
    const [Downvote,setDownvote]=useState(DownVote)
    const changeUpvoteState = () => {
        if(Upvote==UpVote){
            setUpvote(RedUpVote)
            setDownvote(DownVote)
        }
        else{
            setUpvote(UpVote)
        }

    };
    const changeDownvoteState = () => {
        if(Downvote==DownVote){
            setUpvote(UpVote)
            setDownvote(RedDownVote)
        }
        else{
            setDownvote(DownVote)
        }

    };
    useEffect(()=>{
        
        if(sentby==="user"){
            setChatBubbleColor("#69DC72")
        }
    },[sentby])
    
      return(
        <div style={style} class="chat-bubble">
            <img  height="30vh" width="30vw"  src={profilePhoto}/>
            
            <div style={{backgroundColor:chatBubbleColor}} class="chat-bubble-chat">
            <div class="post-content-section">
                {message}
                <div style={{display:"flex",alignItems:"center",gap:"10px",justifyContent:"space-between"}}>
                <div class="Upvote-box">
                    <img onClick={changeUpvoteState} height="20vh" width="20vw"  src={Upvote}/><p>{Upvote_count}</p>
                    <img onClick={changeDownvoteState} height="20vh" width="20vw"  src={Downvote}/><p>{Downvote_count}</p>
                </div>
                <p >{date_time}</p>
                </div>
               
                </div>
           
          
            </div>
           
        </div>
      )
}

export default ChatBubble