import React, { useEffect, useState } from "react";
import './Chat.css'
import Sidebar from "react-sidebar";
const mql = window.matchMedia(`(min-width: 800px)`);
import sidebarLogo from './assets/sidebar-logo.png'
import ChatIcon from './assets/chat.png'
import ChatBox from "./components/chatBox";
import Cookies from "js-cookie";
import Global from "./assets/icons/world.png"
import Menu from "./assets/icons/menu.png"
import Logout from "./assets/icons/logout.png"
import College from "./assets/icons/education.png"
import User from "./assets/icons/profile-user.png"
import Settings from "./assets/icons/settings.png"
import ChatBubble from "./components/chatBubble";
import WritePostBox from "./components/WritePostBox";
import { useNavigate } from "react-router-dom";
const apiHost = import.meta.env.VITE_API_HOST

function Chat({socket,getGlobalMessages,sessionUser,section,messages}) {
  const Navigate = useNavigate()
   const [sidebarDocked,setSidebarDocked]=useState(mql.matches)
   const [sidebarOpen,setSidebarOpen]=useState(false)
   const [global,setGlobal]=useState(false) 
 useEffect(()=>{
      setGlobal(false)
 },[])


  function onSetSidebarOpen(open) {
    setSidebarOpen(open);
  }



    return (
    
      <div class="chat-window">
       
        <Sidebar
          sidebar={<div class="sidebar-options">
<div className="bottom" >
            <br></br>
            <a style={{ backgroundColor: (document.URL.includes("global-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={()=>{Navigate("/global-chat")}}><img height="20vh" width="20vw" src={Global} />Global</a>
            <br></br>
            <a style={{ backgroundColor: (document.URL.includes("my-college-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={()=>{Navigate("/my-college-chat")}}> <img height="20vh" width="20vw" src={College} />My College</a>
            <br></br>
            <a onClick={()=>{Navigate("/profile")}}> <img height="20vh" width="20vw" src={User} />Profile</a>
            <br></br>
            <a onClick={()=>{Navigate("/settings")}}><img height="20vh" width="20vw" src={Settings} />Settings</a>
            <br></br>
            <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
            </div>
            <br></br>
            <a style={{marginBottom:"20px"}} onClick={()=>{Cookies.remove('token');window.location.reload()}}><img height="20vh" width="20vw" src={Logout} />Logout</a>
  
            </div>}
            
          open={sidebarOpen}
          docked={sidebarDocked}
          onSetOpen={onSetSidebarOpen}
          styles={
            {
              root: {
                width: "100vw",
                height:window.innerHeight,
                overflow:"hidden",
                scrollbarWidth:"none",
              },
              sidebar: {
                zIndex: "2",
                backgroundColor: "rgb(16, 16, 16)",
                color: "white",
                padding: "20px",
                transition:"none",
                webkitTransition:"none"
              },
              content: {
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                scrollbarWidth:"none",
                overflow:"hidden",
                alignItems:"center",
                transition:"none",
                webkitTransition:"none"
              },


            }
          }
        >
          <div style={{ width:"100%",   height:"100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex",alignItems:"center",width:"100%",justifyContent:"center" }}>
            <img className="menu" onClick={onSetSidebarOpen}  src={Menu} style={{ margin:"30px",float:"left" ,height:"20px",width:"20px"}}/>
              <h2 style={{ textAlign:"center", width: "100%", color: "white", fontWeight: "normal" }}>{section} Lounge </h2>
              <p style={{color:"white"}}>connect to this ip : {apiHost.slice(0,apiHost.length-4)+5173} </p>
            </div>
            <div style={{
                display:"flex",flexDirection:"column" ,gap:"10px", overflowY:"scroll", msOverflowStyle: "none",  /* IE and Edge */
                scrollbarWidth:"none" ,
            }}>
              <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
              <div >
                <WritePostBox socket={socket} getGlobalMessages={getGlobalMessages} sessionUser={sessionUser}></WritePostBox>
              </div>
              <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
              <div style={{
                 display:"flex",
                 flexDirection:"column",
                 gap:"10px",
                 width:"100%"
              }}>
                {messages.map((data, index) => (
                  <>
                    <ChatBubble
                      getGlobalMessages={getGlobalMessages}
                      usertag={data.usertag}
                      userid={data.user}
                      id={data.id}
                      key={index}
                      image={data.image}
                      liked={data.global}
                      date_time={data.date_time}
                      username={data.username}
                      Upvote_count={data.upVoteCount}
                      Downvote_count={data.downVoteCount}
                      message={data.message}
                      sentby={data.SentBy}
                    />
                    <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
                  </>
                ))}
              </div>


            </div>
          </div>



        </Sidebar>

      </div>
    );
}
export default Chat