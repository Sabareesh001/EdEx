import React,{ useEffect, useState } from 'react'
import Button from '../components/button.jsx'
import './register.css'
import Input from '../components/input.jsx'
import PasswordField from '../components/password.jsx'
import BasicSelect from '../components/select.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const api_host = import.meta.env.VITE_API_HOST

function Register(){
  const navigate = useNavigate()
  const [registerForm,setRegisterForm]=useState([
  ]);
  const [collegeOptions,setCollegeOptions]=useState([]);
  const [rolesOptions,setRolesOptions]=useState([]);
  useEffect(()=>{
    getOptions()
  },[])
  function getOptions(){
    axios.get(`${api_host}/getCountryOptions`).then((response)=>{
      console.log(response.data)
      setCollegeOptions(response.data)
    })
    axios.get(`${api_host}/getRolesOptions`).then((response)=>{
      setRolesOptions(response.data)
    })
  }
  function handleUsernameChange(e){
    setRegisterForm({...registerForm,username:'global@'+e.target.value})
  }
  function handleNameChange(e){
    setRegisterForm({...registerForm,name:e.target.value})
  }
  function handleEmailChange(e){
    setRegisterForm({...registerForm,email:e.target.value})
  }
  function handleRoleChange(e){
    setRegisterForm({...registerForm,role:e.target.value})
  }
  function handleAgeChange(e){
    setRegisterForm({...registerForm,age:e.target.value,college:"global"})
  }
  function handleCountryChange(e){
    setRegisterForm({...registerForm,country:e.target.value})
  }
  function handlePasswordChange(e){
    setRegisterForm({...registerForm,password:e.target.value})
  }
  function handlePhoneChange(e){
    setRegisterForm({...registerForm,phone:e.target.value})
  }
  function registerUser(){
     axios.post(`${api_host}/registerUser`,registerForm).then((response)=>{
      if(response.data === 1){
        navigate("/login")
      }
     })
  }
  return(
<div class="register">
<form  onSubmit={e => {e.preventDefault();}}   id="register-form">
  <h1>Register</h1>
  <p id='or'>or</p>
  <Input onChange={handleUsernameChange} id={"username"} label={"Username"}/>
  <Input onChange={handleNameChange} id={"name"} label={"Name"}/>
  <Input onChange={handleEmailChange} id={"email"} label={"Email"}/>

  <div id="user-input">
  <BasicSelect onChange={handleRoleChange}  options={rolesOptions} id="Role" label={"Role"}></BasicSelect>
  <Input onChange={handleAgeChange} label={"Age"}></Input>
  </div>

  <PasswordField label={"Set Password"}></PasswordField>


  <PasswordField onChange={handlePasswordChange} label={"Confirm Password"}></PasswordField>

  <div id="user-input">
  <BasicSelect onChange={handleCountryChange} options={collegeOptions} label={"Country"}></BasicSelect>
  <Input onChange={handlePhoneChange} label={"Phone Number"}/>
  </div>

    <Button onclick={registerUser} action={"Signup"}></Button>

    <p id="global">Already have an Account ? Login <a href='/'>here</a></p>
    <p>if you are part of an Institution you will have  already been given an account, try                                         logging in using your student gmail or Contact your Institution  for more details. 
                  check if your institution is available <a href='/checkAvailability'>here.</a></p>
  </form>
</div>

  )
}

export default Register

