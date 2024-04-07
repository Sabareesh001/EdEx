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
          <a><img height="30vh" width="30vw" src={Global}/><b>Global</b></a>
          <br></br>
          <a><img height="30vh" width="30vw" src={College}/><b>My College</b></a>
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
               }
               
            }
          }
        ><div id="chat-icon">
           <img height="70vh" width="70vw"  src={ChatIcon}></img>
           <h1 style={{color:"white",fontWeight:"lighter"}} >No conversions Yet . . . </h1>
        </div> 
         
          <ChatBox style={{position:"absolute",
          bottom:"0",  
         marginBottom:"30px",
  left: "50%",
  transform:"translate(-50%, 0%)"}}></ChatBox>
          
           
        </Sidebar>
       
        </div>
      );
    }
  }
export default Chat