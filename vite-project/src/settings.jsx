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
import Approved from "./assets/icons/approval.png"
import Xmark from "./assets/icons/xmark.png"
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
  const [error,setError]= useState(null)
  const [toggleUserInfo,setToggleUserInfo] = useState(false)
  const [menuToggle,setMenuToggle]=useState(true)
  const [collegeTag,setCollegeTag]= useState("Nil")
  const [collegeTagLength,setCollegeTagLength]= useState(0)
  const [userNameState,setUserNameState]=useState(null)
  const [uploadedProfilePhoto,setUploadedProfilePhoto] = useState(null)
  const [toggleProfiePhotoSave,setToggleProfilePhotoSave] = useState(false)
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

    console.log(sessionUserInfo)
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
   
  useEffect(()=>{
      findTagNameLength()
  },[username])
  useEffect(()=>{
    if((username === sessionUserInfo.Username) && (age === sessionUserInfo.Age)&&(name === sessionUserInfo.Name)&&(role === sessionUserInfo.Role)&&(college === sessionUserInfo.College)){
      setToggleSave(false)
    }
    else{
      setToggleSave(true)
    }
  },[college])
  useEffect(()=>{
    if((username === sessionUserInfo.Username) && (age === sessionUserInfo.Age)&&(name === sessionUserInfo.Name)&&(role === sessionUserInfo.Role)&&(college === sessionUserInfo.College)){
      setToggleSave(false)
    }
    else{
      setToggleSave(true)
    }
  },[role])
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
        College: data.collegeAcronym,
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
    await axios.patch(`${apiHost}/uploadProfilePhoto`, { id: sessionUserInfo.userId, profilePhoto: uploadedProfilePhoto, }, { headers: { 'Content-Type': 'multipart/form-data' } })
    setToggleProfilePhotoSave(false)
  }
  function resetDetails() {
    setUsername(sessionUserInfo.Username)
    setName(sessionUserInfo.Name)
    setCollege(sessionUserInfo.College)
    setAge(sessionUserInfo.Age)
    setRole(sessionUserInfo.Role)
    setToggleSave(false)
    setUserNameState(null)
    const inputs = document.querySelectorAll('input')
     inputs.forEach(input => {
        input.style.backgroundColor = "transparent"
    });
  }
  function handleUsernameChange(e) {
    if (e.target.value.slice(0, collegeTagLength + 1) === username.slice(0, collegeTagLength + 1)) {
      setUsername(e.target.value)
      if(e.target.value === sessionUserInfo.Username){
        setUserNameState(Approved)
      }
      else if(e.target.value.slice(collegeTagLength+1,e.target.value.length)===''){
        setUserNameState(Xmark)
      }
      else{
        axios.get(`${apiHost}/checkUsername`,{params:{username:e.target.value}}).then((res)=>{
          if(res.data === true){
            setUserNameState(Approved)
          }
          else{
            setUserNameState(Xmark)
          }
        })
      }
    
    }
  }
  function handleRoleChange(e) {
    setRole(e.target.value)
  }
  async function updateUserDetails(){
   console.log("im called")
   if(age<17){
    setError("Age must be atleast 17")
   }
   else{
    await axios.put(`${apiHost}/changeUserDetails`,{username:username,name:name,college:college,age:age,role:role,id:sessionUserInfo.userId})
    getUserInfo()
    setError(null)
    setToggleSave(false)
    const inputs = document.querySelectorAll('input')
     inputs.forEach(input => {
        input.style.backgroundColor = "transparent"
    });
    
   }
 
  }

  function handleCollegeChange(e){
    const select = e.target
    const CollegeName = select.options[select.selectedIndex].label
    const tagName = select.options[select.selectedIndex].value
    setCollege(select.value)
    setUsername((prev)=>(tagName+prev.slice(collegeTagLength,prev.length)))
  }

function findTagNameLength(){
  let count=0;
  for(let i=0;i<username.length;i++){
    if(username[i]==='-'){
      break;
    }
    count++;
  }
  setCollegeTagLength(count)
}

  function handleAgeChange(e){
    const age = e.target.value
  if(age==sessionUserInfo.Age){
    setToggleSave(false)
    setAge(age)
  }
  else if(age<0){
    setAge(17)
  }
  else if(age>100){
    setAge(100)
  }    
  else{
    setAge(age)
  }
}
function handleNameChange(e){
  if(e.target.value === sessionUserInfo.Name){
    setToggleSave(false)
  }
    setName(e.target.value)
  }

function handleProfilePhotoUpload(e){
      setUploadedProfilePhoto(e.target.files[0])
      setProfilePic(URL.createObjectURL(e.target.files[0]))
      setToggleProfilePhotoSave(true)
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
            <input onChange={handleProfilePhotoUpload} id="profileUpload" type="file" style={{ display: "none" }}></input>
            <img className='profilePic' height={"180vh"} width={"180vw"} src={profilePic}></img>
            <label htmlFor="profileUpload" >
              <img className="editIcon" style={{ position: "absolute", top: "85%", left: "73%" }} height={"35px"} src={Edit} />
            </label>
          </div>
        </div>
        {toggleProfiePhotoSave &&
        <div style={{display:"flex",width:"100%",justifyContent:"center",gap:"20px",marginTop:"80px"}}>
        <button type="button" onClick={uploadProfilePhoto} >Save</button>
        <button type="button" onClick={()=>{setProfilePic(apiHost+'/'+sessionUserInfo.profilePic);setToggleProfilePhotoSave(false)}} >Cancel</button>
        </div>}
        <form className="userInfoForm">
        {
            menuToggle&&
                <div className="settingsMenu">
                    
                    <p onClick={(e)=>{setToggleUserInfo(true);setMenuToggle(false)}}>Account Details</p>
                    <p onClick={(e)=>{setToggleUserInfo(true);setMenuToggle(false)}}>Account Details</p>
                    </div>
           
            }
        
         {toggleUserInfo&&
          <div className="userInfo">
          {error!==null && <p style={{fontSize:"13px",color:"red",backgroundColor:"black",borderRadius:"10px",padding:"10px"}}>{error}</p>}

            <div className="userInfoRow">
              <label>Username</label>
              <div className="userInfoRowValues">
                <input readOnly={true} style={{backgroundImage:"url("+userNameState+')'}} id="Username" value={username} onChange={handleUsernameChange}></input>
                <img onClick={enableEdit} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label  >Name</label>
              <div className="userInfoRowValues">
                <input readOnly={true} id="Name" value={name} onChange={handleNameChange}></input>
                <img onClick={enableEdit} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label>College</label>
              <div className="userInfoRowValues">
              <select value={college} onChange={handleCollegeChange}  style={{ width: "100%", height: "30px" }}>
                  {
                    collegeOptions.map((data) => (<option value={data.value} label={data.name} ></option>))
                  }

                </select>
                <img onClick={enableEdit} style={{opacity:"0"}} className="editIconForm" src={Pen}></img>
              </div>
            </div>

            <div className="userInfoRow">
              <label>Age</label>
              <div className="userInfoRowValues">
                <input type="number" readOnly={true} id="Age" value={age} onChange={handleAgeChange}></input>
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
            <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "40px" }}>
            <button type="button" onClick={(e)=>{setToggleUserInfo(false);setMenuToggle(true)}}>Back</button>
            {toggleSave &&
               <>
                <button type="button" onClick={updateUserDetails}>Save</button>
                <button type="button" onClick={resetDetails}>Cancel</button>
                </>
            }
           
           </div>
          </div>
         }
        </form>
      </div>


    </Sidebar>


  );
}
export default Settings