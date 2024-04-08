import React,{useState} from "react";
import './WritePostBox.css'
import Profile from "../assets/icons/man.png"
import Button from "./button";
function WritePostBox(){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    function autoGrow(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    return(
         <div class="write-post-box-container">
             <img  height="30vh" width="30vw"  src={profilePhoto}/>
                <div  className="write-post-box" >
                <textarea  onInput={autoGrow} placeholder="Type Something ..."></textarea>
                <Button action={"Post"} style={{float:"right"}}></Button>
                </div>
                
         </div>
    )
}

export default WritePostBox