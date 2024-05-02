import React, { useEffect, useState } from "react";
import './chatBubble.css'
import Moment from 'moment';
import Comment from './comments.jsx'
import WriteComment from "./writeComment.jsx";
import Profile from "../assets/icons/man.png"
import UpVote from "../assets/icons/dropup-arrow.png"
import RedUpVote from "../assets/icons/dropup-arrow-red.png"
import DownVote from "../assets/icons/dropdown-arrow.png"
import Delete from "../assets/icons/delete.png"
import Comments from "../assets/icons/comments.png"
import Edit from "../assets/icons/edit.png"
import RedDownVote from "../assets/icons/dropdown-arrow-red.png"
import io from "socket.io-client"
import Cookie from 'js-cookie'
import axios from 'axios'
import { Navigate } from "react-router-dom";
const api_host = import.meta.env.VITE_API_HOST;
const socket = io(api_host)
function ChatBubble({image,usertag,getGlobalMessages, username, profile_pic, id, Upvote_count, Downvote_count, message, date_time, style, sentby, userid }) {
    const [profilePhoto, setProfilePhoto] = useState(Profile)
    const [chatBubbleColor, setChatBubbleColor] = useState("")
    const [Upvote, setUpvote] = useState(UpVote)
    const [Downvote, setDownvote] = useState(DownVote)
    const [upVoted, setupVoted] = useState(false)
    const [downVoted, setdownVoted] = useState(false)
    const [gotVotedInfo, setGotVotedInfo] = useState(false);
    const [userId, setUserID] = useState('');
    const [reload, setReload] = useState(false);
    const [following,setFollowing]=useState(true);
    const [followingText,setFollowingText]=useState("Follow");
    const [voteBoxBackgroundColor,setVoteBoxBackgroundColor] = useState("")
    const [comments,setComments]  = useState([])
    const [toggleComments,setToggleComments]=useState(false)
    useEffect(() => {
        const handleResponseGlobalMessages = (data) => {
            console.log("response catched")
            setReload((prev) => !prev)
        }
        const handlefollow = (data)=>{
                console.log(data+":"+userId+" /"+sentby)
                if(data[0]===userId && data[1]===sentby){
                    setFollowingText("Following")
                }
           
            
        }
        const handleUnFollow = (data)=>{
            
                if(data[0]===userId && data[1]===sentby){
                    setFollowingText("Follow")
                }
        }
        socket.on("responseGlobalMessages", handleResponseGlobalMessages)
        socket.on("followResponse",handlefollow)
        socket.on("unFollowResponse",handleUnFollow)
        // Cleanup function
        return () => {
            socket.off("responseGlobalMessages", handleResponseGlobalMessages)
        }
    }, [userId])
    useEffect(() => {
        setFollowing(true)
        getUserID()
        console.log("reloaded")
    }, [])
    useEffect(() => {
        setupVoted(false);
        setdownVoted(false);
        getComments();
    }, [id]);
    useEffect(() => {
        getUporDownVoted()
    }, [id, userId])
    useEffect(()=>{
        checkFollowing()
        getProfilePhoto()
    },[sentby,userId])
    useEffect(() => {
        setUpOrDown()
    }, [upVoted, downVoted])

    function setUpOrDown() {
        setUpvote(UpVote)
        setDownvote(DownVote)
        setVoteBoxBackgroundColor("")
        if (upVoted) {
            setUpvote(RedUpVote)
            setVoteBoxBackgroundColor("rgba(35, 97, 33, 0.466)")
        }
        if (downVoted) {
            setDownvote(RedDownVote)
            setVoteBoxBackgroundColor("rgba(92, 31, 31, 0.466)")
        }
    }
    function getUporDownVoted() {
        getUpVotedMessages()
        getDownVotedMessages()
        setGotVotedInfo(true)
    }
    function getUserID() {
        axios.get(`${api_host}/sessionUserID`, {
            params: {
                cookie: Cookie.get('token')
            }
        }).then((response) => {
            setUserID(response.data)

        })

    }
    async function getProfilePhoto(){
          axios.get(`${api_host}/userInfo`,{params:{userId:sentby}}).then((res)=>{
            if(res.data[0].profile_photo !== 'nil'){
                setProfilePhoto(api_host+"/"+res.data[0].profile_photo)
               
            }
  
          })
    }
    async function deletePost() {
        await axios.delete(`${api_host}/deletePost`, {
            params: {
                post: id
            }
        })
        getGlobalMessages()


    }
    function getDownVotedMessages() {
        axios.get(`${api_host}/downVotedGlobalPosts`).then((response) => {

            for (let i = 0; i < response.data.length; i++) {

                if ((response.data[i]["global"] === id) && (response.data[i]["user"] === userId)) {

                    setdownVoted(true)
                    break
                }
            }


        })
    }
    function getUpVotedMessages() {

        axios.get(`${api_host}/upVotedGlobalPosts`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {

                if ((response.data[i]["global"] === id) && (response.data[i]["user"] === userId)) {
                    setupVoted(true)
                    break
                }
            }
        })
        setGotVotedInfo(true)
    }
    async function addUpVote() {
       
        await axios.patch(`${api_host}/addUpVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
        getGlobalMessages()
    }

    async function removeDownVote() {
        await axios.patch(`${api_host}/removeDownVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
        getGlobalMessages()
    }

    async function removeUpVote() {
        await axios.patch(`${api_host}/removeUpVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
        getGlobalMessages()
    }
    async function addDownVote() {
        await axios.patch(`${api_host}/addDownVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
        getGlobalMessages()
    }

    async function checkFollowing(){
        
       
        if(userId && sentby){
            if(userId==sentby){
                setFollowing(true)
            }
            else{
                await axios.get(`${api_host}/isFollowing`,{
                    params:{
                        userId:sentby,
                        sessionUserId:userId
                    }
                }).then((response)=>{
                    if(response.data===false){
                        setFollowing(false)
                    }
                    else{
                        setFollowing(true)
                    }
                })
            }
        }

  
    }
    const changeUpvoteState = (e) => {
        e.target.classList.remove('.voteIcon:hover')             

        if (Upvote === UpVote) {
            setUpvote(RedUpVote)
            setupVoted(true)
            addUpVote()
        }
        if (Downvote === RedDownVote) {
            setDownvote(DownVote)
            setdownVoted(false)
            removeDownVote()
        }
        if (Upvote === RedUpVote) {
            setupVoted(false)
            setUpvote(UpVote)
            removeUpVote()
        }

    };
    Moment.locale('en', {
        relativeTime: {
          future: 'in %s',
          past: '%s ago',
          s:  '%ds',
          ss: '%ds',
          m:  '%dm',
          mm: '%dm',
          h:  '%dh',
          hh: '%dh',
          d:  '%dd',
          dd: '%dd',
          M:  '%dm',
          MM: '%dM',
          y:  '%dY',
          yy: '%dY'
        }
      });
    const changeDownvoteState = () => {
        if (Downvote == DownVote) {
            setDownvote(RedDownVote)
            setUpvote(UpVote)
            setupVoted(false)
            setdownVoted(true)
            addDownVote()
        }
        if (Upvote === RedUpVote) {
            setUpvote(UpVote)
            setupVoted(false)
            removeUpVote()
        }

        if (Downvote === RedDownVote) {
            setDownvote(DownVote)
            setdownVoted(false)
            removeDownVote()
        }

    };
    function showImageFullScreen(e){
        const img = e.target.style
        const imgDiv =e.target.parentNode.style
        const oldStyle = {...imgDiv}
        let style = {
    position: 'absolute',
    top:'0',
    bottom:'0',
    left:'0',
    right:'0',
    margin:'auto',
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    maxHeight:"100vh",
    maxWidth:"100vw",
    zIndex:'9999',
    backdropFilter:"blur(10px)"
        }
       Object.assign(imgDiv,style)
       img.maxHeight="80%"
        document.body.addEventListener('click',(e)=>{
            if(!(e.target.classList.contains('image'))){
                img.maxHeight="100%"
                Object.assign(imgDiv, oldStyle);
            }
        })
    }
   async function handleFollow(){
         if(followingText === "Follow"){
           
           await axios.post(`${api_host}/add_follow`,{
                userId:userId,
                following:sentby
            })
             setFollowingText("Following")
             socket.emit('follow',[userId,sentby]);
         }
         else{
            
           await axios.delete(`${api_host}/remove_follow`,{params:{
            userId:userId,
            following:sentby
           }
  
            })
            setFollowingText("Follow")
            socket.emit('unfollow',[userId,sentby]);
         }
         
    }

    async function getComments(){
       await axios.get(`${api_host}/globalComments?post_id=${id}`).then((response)=>{
            setComments(response.data)
        })
    }
    return (
        <div key={reload ? 1 : 0} style={style} class="chat-bubble">



            <div  class="chat-bubble-chat">
                <div style={{ display: "flex", gap: "10px", alignItems: "center"}}>
                    <a style={{color:"white",display:'flex',alignItems:"center",gap:"10px"}} href={`http://${window.location.host}/user?id=${sentby}`} ><img onClick={Navigate(`${api_host}/profile`)} height="30vh" width="30vw" style={{borderRadius:"100px"}} src={profilePhoto} />
                    <p onClick={Navigate(`${api_host}/profile?id=${sentby}`)} style={{ fontSize: "12px" }}>{username}</p></a>
                    <p style={{fontSize:"12px",color:"grey"}}>·</p>
                    <p style={{color:"grey"}} >{Moment(date_time).fromNow(true)}</p>
                    {(!following) && <button onClick={handleFollow} className="follow-button">{followingText}</button>}
                </div>
                <div class="post-content-section">
                  {image && <div className="imgDiv"><img className="image" style={{borderRadius:"20px"}} onClick={showImageFullScreen} src={api_host+'\\'+image}></img></div>}
                    <p style={{fontSize:"18px",margin:"0",padding:"0"}}>{message}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                        <div class="Upvote-box">
                            <div className="voteIconsContainer" style={{ display: "flex", gap: "10px", alignItems: "center" ,backgroundColor:voteBoxBackgroundColor}}>
                                <div className="voteBox" >  <img className="voteIcon" onClick={changeUpvoteState} height="20vh" width="20vw" src={Upvote} /><p>{Upvote_count}</p></div>
                                <div className="voteBox" ><img className="voteIcon"  onClick={changeDownvoteState} height="20vh" width="20vw" src={Downvote} /><p>{Downvote_count}</p></div>
                                
                            </div>
                            <img onClick={()=>{setToggleComments((prev)=>!prev)}} className="comment-icon" src={Comments}></img>
                            {userId === sentby && (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img onClick={deletePost} height="20vh" width="20vw" src={Delete} />
                                </div>
                            )}
                        </div >
                       

                    </div >
                   
                    
                    {toggleComments && <div className="commentSection">
                    <WriteComment getComments={getComments} userId={userId} postId={id}></WriteComment>
                    {console.log(comments)}
                   {
                    
                      comments.map((data)=>(<><div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div><Comment profilePicture={api_host+"/"+data.profilePic} userId={data.user} sessionUserId={userId} id={data.id} getComments={getComments} like_count={data.like_count} comment={data.comment} user={data.username} datetime={Moment(data.datetime).fromNow(true)}
                       ></Comment></>))
                   }
                    </div>}
                
                </div>
           
 


            </div>

        </div>
    )

}

export default ChatBubble