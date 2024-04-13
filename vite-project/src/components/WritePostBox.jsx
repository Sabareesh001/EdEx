import React,{useEffect, useState} from "react";
import './WritePostBox.css'
import Profile from "../assets/icons/man.png"
import Button from "./button";
import axios from 'axios'
import Cookies from 'js-cookie'
const api_host = import.meta.env.VITE_API_HOST
function WritePostBox({sessionUser,getGlobalMessages}){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    const [postContent,setPostContent] = useState("")
    function autoGrow(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    async function publishPost(){
        if(postContent.length>0){
            await axios.post(`${api_host}/postGlobalLounge`,{message:postContent,cookie:Cookies.get('token')})
        }
        setPostContent('')
        getGlobalMessages()
      
    }
    
   
    return(
         <div class="write-post-box-container">
             
                <div  className="write-post-box" >
            <img  height="30vh" width="30vw"  src={profilePhoto}/>
            <div style={{display:"flex",width:"100%"}}>
            <textarea onChange={(event)=>{setPostContent(event.target.value)}} value={postContent}  onInput={autoGrow} placeholder="Type Something ..."></textarea>
                <Button onclick={publishPost} action={"Post"} style={{float:"right"}}></Button>
            </div>
                
                </div>
                
         </div>
    )
   
}

export default WritePostBox