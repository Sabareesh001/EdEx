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
import SettingsImg from "./assets/icons/settings.png"
import ChatBubble from "./components/chatBubble";
import Profile from "./assets/icons/man.png";
import Edit from "./assets/icons/pen.png";
import Pen from "./assets/icons/edit.png"
import WritePostBox from "./components/WritePostBox";
import { useNavigate } from "react-router-dom";
import './settings.css'
import axios from "axios";
const apiHost = import.meta.env.VITE_API_HOST

function Settings({ sessionUser }) {
  const Navigate = useNavigate()
  const [sidebarDocked, setSidebarDocked] = useState(mql.matches)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [global, setGlobal] = useState(false)
  const [sessionUserInfo, setSessionUserInfo] = useState({
    Name: "nil",
    userId: "nil",
    Username: "nil",
    College: "nil",
    Age: "nil",
    Mobile: "nil",
    Role: "nil",
    profilePic: "nil"
  })
  const [profilePic, setProfilePic] = useState(Profile)
  const [username, setUsername] = useState("Nil")
  const [name, setName] = useState("Nil")
  const [college, setCollege] = useState("Nil")
  const [age, setAge] = useState("Nil")
  const [role, setRole] = useState("Nil")
  const [toggleSave, setToggleSave] = useState(false)
  const [roleOptions, setRoleOptions] = useState([])
  const [collegeOptions,setCollegeOptions] = useState([])
  useEffect(() => {
    setGlobal(false)
    getUserInfo()
    document.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'IMG' && e.target.tagName !== 'BUTTON') {
        const inputs = document.querySelectorAll('.userInfoRowValues input');
        inputs.forEach((input) => {
          input.setAttribute('readOnly', true)
          input.style.backgroundColor = "transparent"
        });
      }
    })
    getRoleOptions()
    getCollegeOptions()
  }, [])

  useEffect(() => {
    setUsername(sessionUserInfo.Username)
    setName(sessionUserInfo.Name)
    setCollege(sessionUserInfo.College)
    setAge(sessionUserInfo.Age)
    setRole(sessionUserInfo.Role)
  }, [sessionUserInfo])

  useEffect(() => {
    if (sessionUserInfo.profilePic !== "nil") {
      setProfilePic(apiHost + "/" + sessionUserInfo.profilePic)
    }
  }, [sessionUserInfo.profilePic])

  function getRoleOptions() {
    axios.get(`${apiHost}/getRolesOptions`).then((res) => {
      setRoleOptions(res.data)
    })
  }
  function getCollegeOptions(){
    axios.get(`${apiHost}/getCollegeOptions`).then((res)=>{
      setCollegeOptions(res.data)
    })
  }
  function onSetSidebarOpen(open) {
    setSidebarOpen(open);
  }

  async function getUserInfo() {
    await axios.get(`${apiHost}/userInfo`, {
      params: {
        cookie: Cookies.get("token")
      }
    }).then((response) => {
      console.log(response.data)
      const data = response.data[0]
      setSessionUserInfo({
        Name: data.name,
        userId: data.id,
        Username: data.username,
        College: data.collegeName,
        Age: data.age,
        Mobile: data.phone.slice(0, 4) + '*'.repeat(data.phone.slice(4, data.phone.length - 3).length) + data.phone.slice(data.phone.length - 3, data.phone.length),
        Role: data.roleName,
        profilePic: data.profile_photo
      })
    })
  }
  function enableEdit(e) {
    const input = e.target.parentNode.childNodes[0]
    input.removeAttribute('readOnly')
    input.focus()
    input.style.backgroundColor = "rgb(0,0,10)"
    console.log(input)
    setToggleSave(true)
  }
  async function uploadProfilePhoto(e) {
    const profilePhotoUpload = e.target.files[0]
    console.log(profilePhotoUpload)
    await axios.patch(`${apiHost}/uploadProfilePhoto`, { id: sessionUserInfo.userId, profilePhoto: profilePhotoUpload, }, { headers: { 'Content-Type': 'multipart/form-data' } })
    getUserInfo()
  }
  function resetDetails() {
    setUsername(sessionUserInfo.Username)
    setName(sessionUserInfo.Name)
    setCollege(sessionUserInfo.College)
    setAge(sessionUserInfo.Age)
    setRole(sessionUserInfo.Role)
    setToggleSave(false)
  }
  function handleUsernameChange(e) {
    let collegeLength = 0;
    for (let i = 0; i < e.target.value.length; i++) {
      if (e.target.value[i] === '-') {
        break;
      }
      collegeLength++;
    }
    if (e.target.value.slice(0, collegeLength + 1) === username.slice(0, collegeLength + 1)) {
      setUsername(e.target.value)
    }
  }
  function handleRoleChange(e) {
    if (e.target.value === sessionUserInfo.Role) { setToggleSave(false)
      setRole( sessionUserInfo.Role)
    
    }
    else {
      setRole(e.target.value)
      setToggleSave(true)
      
    }
  }
  async function updateUserDetails(){
   console.log("im called")
   await axios.put(`${apiHost}/changeUserDetails`,{username:username,name:name,college:college,age:age,role:2,id:sessionUserInfo.userId})
    getUserInfo()
  }
  function handleCollegeChange(e){
    console.log(e.target.value)
    if (e.target.value === sessionUserInfo.College) { 
      setToggleSave(false)
      setCollege( sessionUserInfo.College)
    }
    else {
      setCollege(e.target.value)
      setToggleSave(true)
      
    }
  }
  return (


    <Sidebar
      sidebar={<div class="sidebar-options">
        <div className="bottom" >
          <br></br>
          <a style={{ backgroundColor: (document.URL.includes("global-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={() => { Navigate("/global-chat") }}><img height="20vh" width="20vw" src={Global} />Global</a>
          <br></br>
          <a style={{ backgroundColor: (document.URL.includes("my-college-chat") ? "rgba(65, 46, 108, 0.263)" : "") }} onClick={() => { Navigate("/my-college-chat") }}> <img height="20vh" width="20vw" src={College} />My College</a>
          <br></br>
          <a onClick={() => { Navigate("/profile") }}> <img height="20vh" width="20vw" src={User} />Profile</a>
          <br></br>
          <a><img height="20vh" width="20vw" src={SettingsImg} />Settings</a>
          <br></br>
          <div style={{ width: "100%", borderBottom: "0.5px solid grey" }}></div>
        </div>
        <br></br>
        <a style={{ marginBottom: "20px" }} onClick={() => { Cookies.remove('token'); window.location.reload() }}><img height="20vh" width="20vw" src={Logout} />Logout</a>

      </div>}

      open={sidebarOpen}
      docked={sidebarDocked}
      onSetOpen={onSetSidebarOpen}
      styles={
        {
          root: {
            width: "100vw",
            height: window.innerHeight,
            overflow: "hidden",
            scrollbarWidth: "none",
          },
          sidebar: {
            zIndex: "2",
            backgroundColor: "rgb(16, 16, 16)",
            color: "white",
            padding: "20px",
            transition: "none",
            webkitTransition: "none"
          },
          content: {
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            scrollbarWidth: "none",
            overflow: "hidden",
            alignItems: "center",
            transition: "none",
            webkitTransition: "none"
          },


        }
      }

    >

      <div className='menu' onClick={onSetSidebarOpen} style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}> <img style={{ margin: "40px" }} src={Menu} height={"20px"} width={"20px"} /> </div>

      <div className="profilePage">


        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}> <img height={"30vh"} src={SettingsImg} />    <h2 style={{ color: "white", fontWeight: "normal" }}>Settings</h2></div>

        <div className='profileSectionSettings'>
          <div style={{ position: "relative" }}>
            <input onChange={uploadProfilePhoto} id="profileUpload" type="file" style={{ display: "none" }}></input>
            <img className='profilePic' height={"180vh"} width={"180vw"} src={profilePic}></img>
            <label htmlFor="profileUpload" >
              <img className="editIcon" style={{ position: "absolute", top: "85%", left: "73%" }} height={"35px"} src={Edit} />
            </label>
          </div>
        </div>
        <form className="userInfoForm">
          <div className="userInfo">

            <div className="userInfoRow">
              <label>Username</label>
              <div className="userInfoRowValues">
                <input readOnly={true} id="Username" value={username} onChange={handleUsernameChange}></input>
                <img onClick={enableEdit} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label  >Name</label>
              <div className="userInfoRowValues">
                <input readOnly={true} id="Name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                <img onClick={enableEdit} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label>College</label>
              <div className="userInfoRowValues">
              <select value={college} onChange={handleCollegeChange}  style={{ width: "100%", height: "30px" }}>
                  {
                    collegeOptions.map((data) => (<option value={data.name} label={data.name}></option>))
                  }

                </select>
                <img onClick={enableEdit} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label>Age</label>
              <div className="userInfoRowValues">
                <input readOnly={true} id="Age" value={age} onChange={(e) => { setAge(e.target.value) }}></input>
                <img onClick={enableEdit} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label>Role</label>
              <div className="userInfoRowValues">
                <select value={role} onChange={handleRoleChange} style={{ width: "100%", height: "30px" }}>
                  {
                    roleOptions.map((data) => (<option value={data["value"]} label={data["label"]}></option>))
                  }

                </select>
                <img style={{ opacity: "0" }} className="editIconForm" src={Pen}></img>
              </div>

            </div>
            <br></br>
            {toggleSave &&

              <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "40px" }}>
                <button type="button" onClick={updateUserDetails}>Save</button>
                <button type="button" onClick={resetDetails}>Cancel</button>
              </div>

            }

          </div>
        </form>
      </div>


    </Sidebar>


  );
}
export default Settings