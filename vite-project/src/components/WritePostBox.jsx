import React,{useEffect, useState} from "react";
import './WritePostBox.css'
import Profile from "../assets/icons/man.png"
import Button from "./button";
import axios from 'axios'
import Cookies from 'js-cookie'
import AddImage from "../assets/icons/add-image.png"
import ClearImage from "../assets/icons/clear-image.png"
const api_host = import.meta.env.VITE_API_HOST
function WritePostBox({sessionUser,getGlobalMessages}){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    const [postContent,setPostContent] = useState("")
    const [textarea,setTextArea]=useState("")
    const [selectedImage,setSelectedImage]=useState(null);
    const [file,setFile]=useState("no image");

    function autoGrow(event) {
        setTextArea(event.target);
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    async function publishPost(){
        console.log(file)
        if(postContent.length>0 || file !=="no image"){
            await axios.post(`${api_host}/postGlobalLounge`,{message:postContent,cookie:Cookies.get('token'),image:file},{ headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
                console.log(res.data)
            })
            setFile("no image")
        }
        setPostContent('')
        setSelectedImage(null)
        getGlobalMessages()
        textarea.style.height =''
      
    }
    function handleCtrlEnter(e){
        if((e.keyCode===10 || e.keyCode === 13)&& e.ctrlKey){
            publishPost()
        }
    }

    function handleFileChange(e){
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
    }
   
    return(
         <div class="write-post-box-container">
             
                <div  className="write-post-box" >
            <div style={{display:"flex",width:"100%",gap:"25px"}}>
            <img  height="40vh" width="40vw"  src={profilePhoto}/>
            <div style={{width:"100%"}}>
            {
                selectedImage !== null && 
                <div style={{display:"flex"}}>
                <img style={{maxHeight:"30vh",maxWidth:"30vw",backgroundColor:"white",borderRadius:"20px"}} src={selectedImage}></img>
                <img onClick={()=>{setSelectedImage(null);setFile("no image");document.getElementById("imgFile").value = ""}} height="20vh" width="20vw" src={ClearImage}/>
                <br></br>
                </div> 
                   
            }
         
            <textarea onKeyUp={handleCtrlEnter} onChange={(event)=>{setPostContent(event.target.value)}} value={postContent}  onInput={autoGrow} placeholder="Type Something ..."></textarea>
            </div>
                <Button onclick={publishPost} action={"Post"} style={{float:"right"}}></Button>
            </div>
            <form>
            <input accept="image/*" type="file"   id="imgFile" onChange={handleFileChange} style={{display:"none"}} ></input>
            <label htmlFor="imgFile">
            <img height="20vh" width="20vw" src={AddImage}/>
                </label>
           
            </form>
            
                
                </div>
                
         </div>
    )
   
}

export default WritePostBox