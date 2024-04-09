import React,{useState} from "react";
import './WritePostBox.css'
import Profile from "../assets/icons/man.png"
import Button from "./button";
import axios from 'axios'
import Cookies from 'js-cookie'
function WritePostBox({sessionUser}){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    const [postContent,setPostContent] = useState("")
    function autoGrow(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    function publishPost(){
        if(postContent.length>0){
            axios.post('http://localhost:3000/postGlobalLounge',{message:postContent,cookie:Cookies.get('token')})
            window.location.reload(false)
        }
        
    }
    return(
         <div class="write-post-box-container">
             
                <div  className="write-post-box" >
            <img  height="30vh" width="30vw"  src={profilePhoto}/>
            <div style={{display:"flex",width:"100%"}}>
            <textarea onChange={(event)=>{setPostContent(event.target.value)}} onInput={autoGrow} placeholder="Type Something ..."></textarea>
                <Button onclick={publishPost} action={"Post"} style={{float:"right"}}></Button>
            </div>
                
                </div>
                
         </div>
    )
}

export default WritePostBox