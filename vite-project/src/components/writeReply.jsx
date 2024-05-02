import React, { useState } from "react";
import Profile from '../assets/icons/man.png'
import './writeReply.css'
const api_host = import.meta.env.VITE_API_HOST
import axios from 'axios'
function writeReply({userId,comment_id, getReplys,reply_id,setToggleWriteReply,setToggleReply }){
    const [reply,setReply]=useState("");
    function autoGrow(event) {
        let textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    async function  handleReply(e){
        console.log(comment_id)
           await axios.post(`${api_host}/addGlobalReply`,{
                reply:reply,
                user:userId,
                comment_id:comment_id,
                reply_id:reply_id
            })
            setReply("")
           getReplys()
           setToggleWriteReply(false)
           setToggleReply(true)

    }
    function handleCtrlEnter(e){
        if((e.keyCode===10 || e.keyCode === 13)&& e.ctrlKey){
            handleReply()
        }
    }
    function handleChange(e){
       setReply(e.target.value)
    }
    return(
      <div className="writeReply">
        <div className="replyBox">
        <img height={"20px"} width={"20px"} src={Profile}></img>
        <textarea onKeyUp={handleCtrlEnter} value={reply} onChange={handleChange} onInput={autoGrow} placeholder="Add reply .."></textarea>
        <button onClick={handleReply}>Reply</button>
        </div>
       
      </div>
    )

}

export default writeReply