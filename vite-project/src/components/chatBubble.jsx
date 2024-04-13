import React, { useEffect, useState } from "react";
import './chatBubble.css'
import Profile from "../assets/icons/man.png"
import UpVote from "../assets/icons/dropup-arrow.png"
import RedUpVote from "../assets/icons/dropup-arrow-red.png"
import DownVote from "../assets/icons/dropdown-arrow.png"
import Delete from "../assets/icons/delete.png"
import RedDownVote from "../assets/icons/dropdown-arrow-red.png"
import Cookie from 'js-cookie'
import axios from 'axios'
const api_host = import.meta.env.VITE_API_HOST
function ChatBubble({ socket, getGlobalMessages, username, profile_pic, id, Upvote_count, Downvote_count, message, date_time, style, sentby, userid }) {
    const [profilePhoto, setProfilePhoto] = useState(Profile)
    const [chatBubbleColor, setChatBubbleColor] = useState("white")
    const [Upvote, setUpvote] = useState(UpVote)
    const [Downvote, setDownvote] = useState(DownVote)
    const [upVoted, setupVoted] = useState(false)
    const [downVoted, setdownVoted] = useState(false)
    const [gotVotedInfo, setGotVotedInfo] = useState(false);
    const [userId, setUserID] = useState('');
    useEffect(() => {
        getUserID()
        getGlobalMessages()
    }, [])

    useEffect(() => {
        setupVoted(false);
        setdownVoted(false);
        
    }, [id]);

    useEffect(() => {
        getUporDownVoted()
        userChatColor()
    }, [id,userId])
    useEffect(()=>{
        setUpOrDown()
    },[upVoted,downVoted])

    function setUpOrDown() {
        setUpvote(UpVote)
        setDownvote(DownVote)
        if (upVoted) {
            setUpvote(RedUpVote)
            console.log( `set ${message} as upvoted`)
        }
        if (downVoted) {
            setDownvote(RedDownVote)
            console.log( `set ${message} as downvoted`)
        }
    }
    function getUporDownVoted(){
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
            setChatBubbleColor("#69DC72")
            console.log(userId)
            console.log("Colour function is called")
        }
        else {
            setChatBubbleColor("white")
        }
    }

     function deletePost() {
         axios.delete(`${api_host}/deletePost`, {
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
     function addUpVote() {
         axios.patch(`${api_host}/addUpVote`, {
            id: id,
            lounge: "global",
            user: userId
        })

    }

     function removeDownVote() {
         axios.patch(`${api_host}/removeDownVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
    }

     function removeUpVote() {
         axios.patch(`${api_host}/removeUpVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
    }
     function addDownVote() {
         axios.patch(`${api_host}/addDownVote`, {
            id: id,
            lounge: "global",
            user: userId
        })
    }


    const changeUpvoteState =  () => {

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
    const changeDownvoteState =  () => {
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


    return (
        <div style={style} class="chat-bubble">



            <div style={{ backgroundColor: chatBubbleColor }} class="chat-bubble-chat">
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <img height="30vh" width="30vw" src={profilePhoto} />
                    <p style={{ fontSize: "15px" }}>{username}</p>
                </div>
                <div class="post-content-section">
                    {message}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                        <div class="Upvote-box">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img onClick={changeUpvoteState} height="20vh" width="20vw" src={Upvote} /><p>{Upvote_count}</p>
                                <img onClick={changeDownvoteState} height="20vh" width="20vw" src={Downvote} /><p>{Downvote_count}</p>
                            </div>
                            {userId === sentby && (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img onClick={deletePost} height="20vh" width="20vw" src={Delete} />
                                </div>
                            )}

                        </div >
                    </div >
                </div>
                <p >{date_time}</p>



            </div>

        </div>
    )

}

export default ChatBubble