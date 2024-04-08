import React from "react";
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
                padding:"20px"
               },
               content:{
                msOverflowStyle: "none", 
                scrollbarWidth: "none",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
               }
               
            }
          }
        >
          <i><h2 style={{color:"white",fontWeight:"normal"}}>{this.props.section} Lounge</h2>
          <hr style={{backgroundColor:"#69DC72",width:"100px",height:"5px",border:"none",borderRadius:"30px"}}></hr></i>
          
          <div class="posts">
          <WritePostBox></WritePostBox>
             {
              this.props.messages.map((data, index) => (
                <ChatBubble key={index} date_time={data.date_time} Upvote_count={data.Upvote_count} Downvote_count={data.Downvote_count} message={data.message} sentby={data.SentBy} />
            ))
            
                           }
                           
    
          </div>
          
         
          <div id="chat-icon">
         
           {/* <img height="70vh" width="70vw"  src={ChatIcon}></img>
           <h1 style={{color:"white",fontWeight:"lighter"}} >No conversions Yet . . . </h1> */}
        </div> 
         
       
          
           
        </Sidebar>
       
        </div>
      );
    }
  }
export default Chat