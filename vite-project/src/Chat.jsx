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

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
    30
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });

  }

  render() {
    return (
      <div class="chat-window">
        <Sidebar
          sidebar={<div class="sidebar-options">

            <br></br>
            <a style={{ backgroundColor: (document.URL.includes("global-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} href="/global-chat"><img height="20vh" width="20vw" src={Global} />Global</a>
            <br></br>
            <a style={{ backgroundColor: (document.URL.includes("my-college-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} href="/my-college-chat"><img height="20vh" width="20vw" src={College} />My College</a>
            <br></br>
            <a><img height="20vh" width="20vw" src={User} />Profile</a>
            <br></br>
            <a><img height="20vh" width="20vw" src={Settings} />Settings</a>
            <br></br>
            <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
            <br></br>
            <a onClick={()=>{Cookies.remove('token');window.location.reload()}}><img height="20vh" width="20vw" src={Logout} />Logout</a>
            </div>}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={
            {
              root: {
                width: "100vw"
              },
              sidebar: {
                zIndex: "2",
                backgroundColor: "rgb(16, 16, 16)",
                color: "white",
                padding: "20px",
              },
              content: {
                backgroundColor: "black",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                scrollbarWidth:"none",
                overflow:"hidden",
                alignItems:"center"
              },


            }
          }
        >
          <div style={{ width: "100vw",   height:"100vh", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex",alignItems:"center",width:"100%" }}>
            <img onClick={this.onSetSidebarOpen}  src={Menu} style={{ margin:"10px",float:"left" ,height:"20px",width:"20px"}}/>
              <h2 style={{ textAlign:"center", width: "100%", color: "white", fontWeight: "normal" }}>{this.props.section} Lounge</h2>
              


            </div>
            <div style={{
                display:"flex",flexDirection:"column" ,gap:"10px", overflowY:"scroll", msOverflowStyle: "none",  /* IE and Edge */
                scrollbarWidth:"none" ,
            }}>
              <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
              <div >
                <WritePostBox socket={this.props.socket} getGlobalMessages={this.props.getGlobalMessages} sessionUser={this.props.sessionUser}></WritePostBox>
              </div>
              <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
              <div style={{
                 display:"flex",
                 flexDirection:"column",
                 gap:"10px",
              }}>
                {this.props.messages.map((data, index) => (
                  <>
                    <ChatBubble
                      getGlobalMessages={this.props.getGlobalMessages}
                      usertag={data.usertag}
                      userid={data.user}
                      id={data.id}
                      key={index}
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
}
export default Chat