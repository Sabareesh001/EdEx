import React,{useEffect, useState} from "react";
import './Chat.css'
import Sidebar from "react-sidebar";
const mql = window.matchMedia(`(min-width: 800px)`);
import sidebarLogo from './assets/sidebar-logo.png'
import ChatIcon from './assets/chat.png'
import ChatBox from "./components/chatBox";
import Global from "./assets/icons/world.png"
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
            <img height="50px" width="50px" src={sidebarLogo}/>
            <br></br>
          <a href="/global-chat"><img height="30vh" width="30vw" src={Global}/><b>Global</b></a>
          <br></br>
          <a href="/my-college-chat"><img height="30vh" width="30vw" src={College}/><b>My College</b></a>
          <br></br>
          <a><img height="30vh" width="30vw" src={User}/><b>Profile</b></a>
          <br></br>
          <a><img height="30vh" width="30vw" src={Settings}/><b>Settings</b></a></div>}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={
            {
            
               sidebar:{
                backgroundColor:"#69DC72",
                color:"black",
                padding:"40px",
               },
               content:{
                display:"flex",
                alignItems:"center",
                flexDirection:"column",
                gap:"10px",
                margin:"0",
               }
               
            }
          }
        >
          <div style={{width:"100px",justifyContent:"center", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <div style={{ display:"flex", justifyContent:"center"}}>
            <i><h2  style={{ width:"100%",color:"white",fontWeight:"normal"}}>{this.props.section} Lounge</h2>
            <hr style={{backgroundColor:"#69DC72",width:"100px",height:"5px",border:"none",borderRadius:"30px"}}></hr></i>
            
            </div>
            <div style={{display:"flex",flexDirection:"column" ,gap:"10px", overflowY:"scroll", msOverflowStyle: "none",  /* IE and Edge */
              scrollbarWidth:"none"  }}>
            <div >
              <WritePostBox socket={this.props.socket} getGlobalMessages={this.props.getGlobalMessages} sessionUser={this.props.sessionUser}></WritePostBox>
            </div>
                    
                    <div style={{display:"flex",gap:"10px",flexDirection:"column",width:"100%"}}>
            {
             this.props.messages.map((data, index) => (
               <ChatBubble socket={this.props.socket}  getGlobalMessages={this.props.getGlobalMessages} userid={data.user} id={data.id} key={index} liked={data.global} date_time={data.date_time} username={data.username} Upvote_count={data.upVoteCount} Downvote_count={data.downVoteCount} message={data.message} sentby={data.SentBy} />
                   ))
                          }
                    </div>
            
            </div>
          </div>
          
    
        
        </Sidebar>
       
        </div>
      );
    }
  }
export default Chat