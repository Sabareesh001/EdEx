import './profile.css'
import React, { useEffect, useState } from 'react';
import Sidebar from "react-sidebar";
import ProfilePic from "./assets/icons/man.png"
import Global from "./assets/icons/world.png"
import Menu from "./assets/icons/menu.png"
import Edit from "./assets/icons/edit.png"
import Logout from "./assets/icons/logout.png"
import College from "./assets/icons/education.png"
import User from "./assets/icons/profile-user.png"
import Settings from "./assets/icons/settings.png"
import Follow from "./assets/icons/follow.png"
import Tick from "./assets/icons/tick.png"
import Cookies from "js-cookie"
import axios from 'axios';
import Input from './components/input';
const apiHost = import.meta.env.VITE_API_HOST
const mql = window.matchMedia(`(min-width: 800px)`);
const queryParams = new URLSearchParams(window.location.search);
const userId = queryParams.get('id');
import { useNavigate } from 'react-router-dom';
function Profile () {
    const Navigate = useNavigate()
    const [sidebarDocked,setSidebarDocked]=useState(mql.matches)
    const [sidebarOpen,setSidebarOpen]=useState(false)
    const [profilePic,setProfilePic]=useState(ProfilePic)
    const [userInfo,setUserInfo]=useState({
      Name : 'nil',
      userId:'nil',
      Username : 'nil',
      College : 'nil',
      Age : 'nil',
      Mobile : 'nil',
      Role : 'nil',
      ProfilePic: 'nil'
    })
    const [sessionUserInfo,setSessionUserInfo]=useState({
      Name : 'nil',
      userId:'nil',
      Username : 'nil',
      College : 'nil',
      Age : 'nil',
      Mobile : 'nil',
      Role : 'nil',
      ProfilePic: 'nil'
    })
    const [noOfPosts,setNoOfPosts]=useState(0)
    const [follow,setFollow]=useState(Follow)
    const [followText,setFollowText]=useState("Follow")
    const [followerCount,setFollowerCount]=useState(null)
    const [followingCount,setFollowingCount]=useState(null)

      function onSetSidebarOpen(open) {
        setSidebarOpen(open)
      }
     
   useEffect(()=>{
    getUserInfo()
    getNoOfPosts()
   
   },[])

useEffect(()=>{
  
  isFollowing()
},[sessionUserInfo,userInfo])


  useEffect(()=>{
    if(userInfo.ProfilePic !== 'nil'){
      setProfilePic(apiHost+"/"+userInfo.ProfilePic)
    }
    getNoOfPosts()

    getNoOfFollowers()
  },[userInfo])


  
  async function isFollowing(){
    console.log(sessionUserInfo)
    if(userId!== null && (userId!=sessionUserInfo.userId)){
      console.log(userId +" | " +sessionUserInfo.userId);
    await axios.get(`${apiHost}/isFollowing`,{params:{
     userId:userInfo.userId,
     sessionUserId:sessionUserInfo.userId
    }}).then((response)=>{
      console.log(response.data)
      if(response.data===true){
        setFollow(Tick)
        setFollowText("")
        document.querySelector(".followImg").style.backgroundColor = "white";
      }
      else{
        setFollow(Follow)
        setFollowText("Follow")
      }
    })
  }
  else{
    setFollow(null)
    setFollowText("")
  }
  }
    async function getUserInfo(){
      await axios.get(`${apiHost}/userInfo`,{
        params:{
            cookie:Cookies.get("token")
        }
    }).then((response)=>{
        console.log(response.data)
        const data = response.data[0]
        setSessionUserInfo( {
          Name : data.name,
          userId:data.id,
          Username : data.username,
          College : data.collegeName,
          Age : data.age,
          Mobile : data.phone.slice(0,4)+'*'.repeat(data.phone.slice(4,data.phone.length-3).length)+data.phone.slice(data.phone.length-3,data.phone.length),
          Role : data.roleName,
          ProfilePic: data.profile_photo
      })
    })
      if(!userId){
        await axios.get(`${apiHost}/userInfo`,{
          params:{
              cookie:Cookies.get("token")
          }
      }).then((response)=>{
          console.log(response.data)
          const data = response.data[0]
          setUserInfo({
            Name : data.name,
            userId:data.id,
            Username : data.username,
            College : data.collegeName,
            Age : data.age,
            Mobile : data.phone.slice(0,4)+'*'.repeat(data.phone.slice(4,data.phone.length-3).length)+data.phone.slice(data.phone.length-3,data.phone.length),
            Role : data.roleName,
            ProfilePic:data.profile_photo
        })
      })
      }
      else{
        await axios.get(`${apiHost}/userInfo`,{
          params:{
              userId:userId
          }
      }).then((response)=>{
          const data = response.data[0]
        setUserInfo({
          Name : data.name,
          userId:data.id,
          Username : data.username,
          College : data.collegeName,
          Age : data.age,
          Mobile : data.phone.slice(0,4)+'*'.repeat(data.phone.slice(4,data.phone.length-3).length)+data.phone.slice(data.phone.length-3,data.phone.length),
          Role : data.roleName,
          ProfilePic:data.profile_photo
      })
         
      })
      }
        }
      async function getNoOfFollowers(){
          /////////////////////////////////////////////////////
      await axios.get(`${apiHost}/no_of_followers`,{
        params:{
          userId:userInfo.userId
        }
      }).then((response)=>{
        if(response.data[0].count){
          setFollowerCount(response.data[0].count)
        }
        else{
          setFollowerCount(0)
        }
      })

////////////////////////////////////////////////////

      await axios.get(`${apiHost}/no_of_following`,{
        params:{
          userId:userInfo.userId
        }
      }).then((response)=>{
        setFollowingCount(response.data[0].count)
      })
        }
     async function getNoOfPosts(){
        
        await axios.get(`${apiHost}/no_of_posts`,{
            params:{
                userId:userInfo.userId
            }
        }).then((response)=>{
            setNoOfPosts(response.data.post_count)
        })
     }
     async function handleFollow(e){
      if(follow===Follow){
        e.target.style.backgroundColor = "white";
        console.log("clicked")
       setFollow(Tick)
       setFollowText("")
       await axios.post(`${apiHost}/add_follow`,{
        userId: sessionUserInfo.userId,
        following:userInfo.userId
       })
      }
      else{
        e.target.style.backgroundColor = "";
        console.log("clicked")
       setFollow(Follow)
       setFollowText("Follow")
       await axios.delete(`${apiHost}/remove_follow`,{
        params:{
          userId: sessionUserInfo.userId,
          following:userInfo.userId
        }
       })
      }
    getNoOfFollowers()
     }

      return (
        <div className='profile'>
          <Sidebar
            sidebar={<div className="sidebar-options">
  <div className="bottom" >
              <br></br>
              <a style={{ backgroundColor: (document.URL.includes("global-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={()=>{Navigate("/global-chat")}}><img height="20vh" width="20vw" src={Global} />Global</a>
              <br></br>
              <a style={{ backgroundColor: (document.URL.includes("my-college-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={()=>{Navigate("/my-college-chat")}}><img height="20vh" width="20vw" src={College} />My College</a>
              <br></br>
              <a style={{ backgroundColor: (document.URL.includes("profile") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={()=>{Navigate("/profile")}}> <img height="20vh" width="20vw" src={User} />Profile</a>
              <br></br>
              <a onClick={()=>{Navigate("/settings")}}><img height="20vh" width="20vw"  src={Settings} />Settings</a>
              <br></br>
              <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
              </div>
              <br></br>
              <a style={{marginBottom:"20px"}}  onClick={()=>{Cookies.remove('token');window.location.reload()}}><img height="20vh" width="20vw" src={Logout} />Logout</a>
    
              </div>}
            open={sidebarOpen}
            docked={sidebarDocked}
            onSetOpen={onSetSidebarOpen}
            styles={
              {
                root: {
                  width: "100vw",
                  height:"100vh",
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
                  gap:"40px",
                  flexDirection: "column",
                  scrollbarWidth:"none",
                  overflowX:"hidden",
                  overflowY:"scroll",
                  alignItems:"center",
                  transition:"none",
                  webkitTransition:"none"
                },
  
  
              }
            }
          >
            
          <div className='menu' onClick={onSetSidebarOpen}  style={{width:"100vw",}}> <img style={{margin:"40px"}} src={Menu} height={"20px"} width={"20px"}/> </div>
          
          
          <div className='profileSection'>
            
          <img  className='profilePic' height={"150vh"} width={"150vw"} src={profilePic}></img>
          {(follow != null) &&<div className='follow' style={{display:"flex",alignItems:"center",gap:"10px",justifyContent:"center",}}> <img className='followImg' onClick={handleFollow}  src={follow} style={{padding:"2px",borderRadius:"100px"}}  height={"20vh"} width={"20vw"}></img>{followText}</div>}
          <div className='username'>
          {userInfo &&  <p style={{fontSize:"20px"}}>{userInfo.Name}</p>}
         {userInfo &&  <p style={{fontSize:"16px",color:"grey"}}>@{userInfo.Username}</p>}
          </div>
          {userInfo &&  <p style={{fontSize:"16px",color:"grey"}}>{userInfo.College}</p>}
          <div className='userEngagement'>
            <h4>Posts <br></br> {noOfPosts}</h4>
            <h4>Followers <br></br>{followerCount}</h4>
            <h4>Following <br></br>{followingCount}</h4>
          </div>
          </div>
          </Sidebar>
  
        </div>
        
      );
    
  }

export default Profile
