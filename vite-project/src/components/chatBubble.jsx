import React, { useEffect, useState } from "react";
import './chatBubble.css'
import Profile from "../assets/icons/man.png"
import Heart from "../assets/icons/heart.png"
import RedHeart from "../assets/icons/red-heart.png"
function ChatBubble({profile_pic,like_count,message,date_time,style,sentby}){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    const [chatBubbleColor,setChatBubbleColor]=useState("white")
    const [Like,setLike]=useState(Heart)
    const changeLikeState = () => {
        setLike(prevLike => prevLike === Heart ? RedHeart : Heart);

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
                <div class="like-box"><img onClick={changeLikeState} height="20vh" width="20vw"  src={Like}/><p>{like_count}</p></div>
                <p >{date_time}</p>
                </div>
               
                </div>
           
          
            </div>
           
        </div>
      )
}

export default ChatBubble