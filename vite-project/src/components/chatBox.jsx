import React from "react";
import './ChatBox.css'
import Send from "../assets/icons/send.png"
import AddFile from "../assets/icons/add-file.png"
import Button from "./button";
function ChatBox({style}){
    return(
        <div style={style} class="ChatBox">
           <input></input>
           <img height="30px" width="30px" src={AddFile} />
           <div>
           </div>
           <img height="30px" width="30px" src={Send} />
        </div>
    )
}

export default ChatBox