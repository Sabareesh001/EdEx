import React, { useEffect, useState } from "react";
import './chatBubble.css'
import Profile from "../assets/icons/man.png"
import UpVote from "../assets/icons/dropup-arrow.png"
import RedUpVote from "../assets/icons/dropup-arrow-red.png"
import DownVote from "../assets/icons/dropdown-arrow.png"
import RedDownVote from "../assets/icons/dropdown-arrow-red.png"
import Cookie from 'js-cookie'
import axios from 'axios'
function ChatBubble({username,profile_pic,id,Upvote_count,Downvote_count,message,date_time,style,sentby,userid}){
    const [profilePhoto,setProfilePhoto] = useState(Profile)
    const [chatBubbleColor,setChatBubbleColor]=useState("white")
    const [Upvote,setUpvote]=useState(UpVote)
    const [Downvote,setDownvote]=useState(DownVote)
    const [upVoted,setupVoted]=useState(false)
    const [downVoted,setdownVoted]=useState(false)
    const [data, setData] = useState('');
    const [userId,setUserID]=useState('');
      useEffect(()=>{
        let token = Cookie.get('token')
        axios.get('http://localhost:3000/sessionUserID',{
            params:{
                cookie:token
            }
        }).then((response)=>{
           setUserID(response.data)
        })
       

      },[])
      useEffect(()=>{
        axios.get('http://localhost:3000/upVotedGlobalPosts').then((response)=>{
            
        for (let i = 0; i < response.data.length; i++) {
            if((response.data[i]["global"]===id) && (response.data[i]["user"]===userId)){
                setupVoted(true)
            }
            
        }
    })
    axios.get('http://localhost:3000/downVotedGlobalPosts').then((response)=>{
        for (let i = 0; i < response.data.length; i++) {
            
            if((response.data[i]["global"]===id) && (response.data[i]["user"]===userId)){
                setdownVoted(true)
            }
            
        }
    })
      },[userId])
       
    useEffect(()=>{
        if(upVoted){
            setUpvote(RedUpVote)
        }
        if(downVoted){
            setUpvote(UpVote)
            setDownvote(RedDownVote)
        }
    },[upVoted,downVoted,id])
 
    const changeUpvoteState = () => {
        if(Upvote===UpVote){
            setUpvote(RedUpVote)
            axios.patch('http://localhost:3000/addUpVote',{
                id:id,
                lounge:"global",
                user:userId
            })
        } 
        if(Downvote===RedDownVote){
            setDownvote(DownVote)
            setdownVoted(false)
            axios.patch('http://localhost:3000/removeDownVote',{
                id:id,
                lounge:"global",
                user:userId
            })
        }
        if(Upvote===RedUpVote){
            setupVoted(false)
            setUpvote(UpVote)
            axios.patch('http://localhost:3000/removeUpVote',{
                id:id,
                lounge:"global",
                user:userId
            })
            
        }
        reloadComponent()
    };
    const changeDownvoteState = () => {
        if(Downvote==DownVote){

            setDownvote(RedDownVote)
            setUpvote(UpVote)
            setupVoted(false)
            setdownVoted(true)
            
            axios.patch('http://localhost:3000/addDownVote',{
                id:id,
                lounge:"global",
                user:userId
            })
        }
        if(Upvote===RedUpVote){
            setUpvote(UpVote)
            setupVoted(false)
            axios.patch('http://localhost:3000/removeUpVote',{
                id:id,
                lounge:"global",
                cookie: Cookie.get('token')
            })
        }

        if(Downvote===RedDownVote){
            setDownvote(DownVote)
            setdownVoted(false)
            axios.patch('http://localhost:3000/removeDownVote',{
                id:id,
                lounge:"global",
                cookie: Cookie.get('token')
            })
        }
       reloadComponent()

    };
    useEffect(()=>{
        
        if(sentby==="user"){
            setChatBubbleColor("#69DC72")
        }
        
    },[sentby])
    
      return(
        <div style={style} class="chat-bubble">

            
           
            <div style={{backgroundColor:chatBubbleColor}} class="chat-bubble-chat">
            <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
            <img  height="30vh" width="30vw"  src={profilePhoto}/>
            <p style={{fontSize:"15px"}}>{username}</p>
            </div>
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