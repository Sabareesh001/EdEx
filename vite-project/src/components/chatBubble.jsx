import React, { useEffect, useState } from "react";
import './chatBubble.css'
import Moment from 'moment';
import Profile from "../assets/icons/man.png"
import UpVote from "../assets/icons/dropup-arrow.png"
import RedUpVote from "../assets/icons/dropup-arrow-red.png"
import DownVote from "../assets/icons/dropdown-arrow.png"
import Delete from "../assets/icons/delete.png"
import Edit from "../assets/icons/edit.png"
import RedDownVote from "../assets/icons/dropdown-arrow-red.png"
import io from "socket.io-client"
import Cookie from 'js-cookie'
import axios from 'axios'
import zIndex from "@mui/material/styles/zIndex";
const api_host = import.meta.env.VITE_API_HOST
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
    const [voteBoxBackgroundColor,setVoteBoxBackgroundColor] = useState("")
    useEffect(() => {
        getUserID()
        console.log("reloaded")
    }, [])

    useEffect(() => {
        setupVoted(false);
        setdownVoted(false);
    }, [id]);
    useEffect(() => {
        socket.on("responseGlobalMessages", (data) => {
            console.log("response catched")
            if (reload === false) {
                setReload(true)
            }
            else {
                setReload(false)
            }
        })
    }, [])
    useEffect(() => {
        getUporDownVoted()
        userChatColor()
    }, [id, userId])
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
            console.log(`set ${message} as upvoted`)
        }
        if (downVoted) {
            setDownvote(RedDownVote)
            setVoteBoxBackgroundColor("rgba(92, 31, 31, 0.466)")
            console.log(`set ${message} as downvoted`)
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
            console.log("user call is called")
            setUserID(response.data)

        })

    }
    function userChatColor() {
        if (sentby === userId) {
            console.log(`this is sentBy : ${sentby} ${username} and this is user : ${userId} and message is ${message}`)
            setChatBubbleColor("")
            console.log(userId)
            console.log("Colour function is called")
        }
        else {
            setChatBubbleColor("")
        }

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
                    console.log(`${message} is already downvoted`)
                    break
                }
                else {
                    console.log(`${message} is not already downvoted`)
                }

            }


        })
    }
    function getUpVotedMessages() {

        axios.get(`${api_host}/upVotedGlobalPosts`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {

                if ((response.data[i]["global"] === id) && (response.data[i]["user"] === userId)) {
                    setupVoted(true)
                    console.log(`${message} is already upvoted`)
                    break
                }
                else {

                    console.log(`${message} is not already upvoted`)
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


    const changeUpvoteState = () => {
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
        document.body.addEventListener('click',(e)=>{
            if(!(e.target.classList.contains('image'))){
 
                Object.assign(imgDiv, oldStyle);
            }
        })
    }

    return (
        <div style={style} class="chat-bubble">



            <div  class="chat-bubble-chat">
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <img height="30vh" width="30vw" src={profilePhoto} />
                    <p style={{ fontSize: "12px" }}>{username}</p>
                    <p style={{ color:"grey" ,fontSize: "12px" }}>@{usertag}</p>
                    <p style={{fontSize:"12px",color:"grey"}}>·</p>
                    <p style={{color:"grey"}} >{Moment(date_time).fromNow()}</p>
                </div>
                <div class="post-content-section">

                  {image && <div className="imgDiv"><img className="image" style={{borderRadius:"20px"}} onClick={showImageFullScreen} src={api_host+'\\'+image}></img></div>}
                    <p style={{fontSize:"18px"}}>{message}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                        <div class="Upvote-box">
                            <div className="voteIconsContainer" style={{ display: "flex", gap: "10px", alignItems: "center" ,backgroundColor:voteBoxBackgroundColor}}>
                                <div className="voteBox" >  <img className="voteIcon" onClick={changeUpvoteState} height="20vh" width="20vw" src={Upvote} /><p>{Upvote_count}</p></div>
                                <div className="voteBox" ><img className="voteIcon"  onClick={changeDownvoteState} height="20vh" width="20vw" src={Downvote} /><p>{Downvote_count}</p></div>
                            </div>
                            {userId === sentby && (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img onClick={deletePost} height="20vh" width="20vw" src={Delete} />
                                </div>
                            )}

                        </div >
                    </div >
                </div>
           
 


            </div>

        </div>
    )

}

export default ChatBubble