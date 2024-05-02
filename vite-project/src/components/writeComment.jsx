import React, { useState } from "react";
import Profile from '../assets/icons/man.png'
import './writeComment.css'
import Button from "./button";
const api_host = import.meta.env.VITE_API_HOST
import axios from 'axios'
function writeComment({userId,postId, getComments}){
    const [comment,setComment]=useState("");
    function autoGrow(event) {
        let textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    async function  handleComment(e){
          if(comment!==""){
           await axios.post(`${api_host}/addGlobalComment`,{
                comment:comment,
                user:userId,
                post:postId
            })
            setComment("")
           getComments()
          }
    }
    function handleCtrlEnter(e){
        if((e.keyCode===10 || e.keyCode === 13)&& e.ctrlKey){
            handleComment()
        }
    }
    function handleChange(e){
       setComment(e.target.value)
    }
    return(
      <div className="writeComment">
        <div className="commentBox">
        <img height={"30px"} width={"30px"} src={Profile}></img>
        <textarea onKeyUp={handleCtrlEnter} value={comment} onChange={handleChange} onInput={autoGrow} placeholder="Add Comment .."></textarea>
        <button onClick={handleComment}>Comment</button>
        </div>
       
      </div>
    )

}

export default writeComment