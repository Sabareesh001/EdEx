import React,{ useEffect, useId, useState } from 'react'
import Button from '../components/button.jsx'
import {GoogleLogin} from '@react-oauth/google'
import './login.css'
import Input from '../components/input.jsx'
import PasswordField from '../components/password.jsx'
import BasicSelect from '../components/select.jsx'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
const api_host = import.meta.env.VITE_API_HOST
function App({loggedIn,setLoggedIn ,sessionUser, setSessionUser}){
  const [loginFormData,setLoginFormData]=useState(
    {username:"",password:""}
  ) 
  const [collegeOptions,setCollegeOptions]=useState([]);
  const navigate = useNavigate();
  const [college,setCollege]=useState("")
  function  handleCollegeChange (event){
      setCollege(event.target.value)
  }

  useEffect(()=>{
    getOptions()
  },[])
  function getOptions(){
    axios.get(`${api_host}/getCollegeOptions`).then((response)=>{
      console.log(response.data)
      setCollegeOptions(response.data)
    })
  }
  function checkLogin(){
        let data
         axios.post(`${api_host}/checkLogin`,{
              username:college+"@"+loginFormData.username,
              password:loginFormData.password
            }
         ).then((response)=>{
          data= response.data
          if(data["status"] === "1"){
            Cookies.set('token',data["Auth_token"])
            setLoggedIn(true)
            navigate("/global-chat");
          }
          else{
         
          }
          if(loggedIn===true){
            axios.get(`${api_host}/userInfo`,{
              params:{
                userId: data["userId"]
              }
            }).then((response)=>{
              console.log(data["userId"])
              console.log(response.data)
              let userInfo =  response.data[0]
              setSessionUser({
                username:userInfo["username"],
                userId:userInfo["id"],
                collge: userInfo["collegeName"],
                age: userInfo["age"],
                phone: userInfo["phone"],
                role:userInfo["roleName"],
              })
            })
          }
          console.log(sessionUser)
         }).catch((error)=>{
          console.error(error)
         })
        
  }
  function handleUsernameChange(event){
       setLoginFormData((oldData)=>({username: event.target.value,password:oldData.password}))
  }
  function handlePasswordChange(event){
    setLoginFormData((oldData)=>({username:oldData.username,password:event.target.value}))
  }
  return(
<div class="login">
<form  onSubmit={e => {e.preventDefault();}}   id="login-form">
  <h1>Login</h1>
 <GoogleLogin></GoogleLogin>
  <br></br>
  <p id='or'>or</p>
  <br></br>
  <div id="user-input">
  <BasicSelect onChange={handleCollegeChange} options={collegeOptions}   label={"College"}></BasicSelect>
  <Input  value={loginFormData.username} onChange={handleUsernameChange} label={"User Id"}></Input>
  </div>
  
  <br></br>
  <PasswordField  value={loginFormData.password}  onChange={handlePasswordChange}  label={"Password"}></PasswordField>
  <br></br>
    <Button onclick={checkLogin} action={"Login"}></Button>
    <br>
    </br>
    <p id="global">Don’t have an Account ? Join as a Global Member <a href='/register'>here</a></p>
    <p>if you are part of an Institution you will have  already been given an account, try                                         logging in using your student gmail or Contact your Institution  for more details. 
                  check if your institution is available <a href='/checkAvailability'>here.</a></p>
  </form>
</div>

  )
}

export default App

