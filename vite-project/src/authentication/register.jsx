import React,{ useEffect, useState } from 'react'
import Button from '../components/button.jsx'
import './register.css'
import Input from '../components/input.jsx'
import PasswordField from '../components/password.jsx'
import BasicSelect from '../components/select.jsx'
import axios from 'axios'
import Approval from '../assets/icons/approval.png'
import Xmark from '../assets/icons/xmark.png'
import { useNavigate } from 'react-router-dom'
const api_host = import.meta.env.VITE_API_HOST

function Register(){
  const navigate = useNavigate()
  const [registerForm,setRegisterForm]=useState([]);
  const [collegeOptions,setCollegeOptions]=useState([]);
  const [rolesOptions,setRolesOptions]=useState([]);
  const [usernameState,setUsernameState]=useState(null)
  const [confirmPassword,setConfirmPassword]= useState(null)
  const [error,setError]=useState(null)

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

  function checkUsernameAvailability(event){
    axios.get(`${api_host}/checkUsername`,{
      params:{
        username:"global-"+event.target.value
      }
    }).then((response)=>{
      if(response.data===true){
        setUsernameState(Approval)
      }
      else{
        setUsernameState(Xmark)
      }
    })
  }

  function handleUsernameChange(e){
    setRegisterForm({...registerForm,username:'global-'+e.target.value})
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
    if(e.target.value>100){
           e.target.value = 100
    }
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

  function handleConfirmPasswordChange(e){
    if(registerForm.password === e.target.value){
            setConfirmPassword(Approval)
    }
    else{
      setConfirmPassword(Xmark)
    }
  }

  function registerUser(){
    setError(null)
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerForm.email)
    if(usernameState === Xmark){
       setError("Username is not available")
    }
    else if(!isEmail){
      console.log(isEmail)
          setError("Email is invalid")
    }
    else if(registerForm.age <17){
      setError("Age must be atleast 17")
    }
    else if(confirmPassword===Xmark){
      setError("Password Doesn't match")
    }
    else{
      axios.post(`${api_host}/registerUser`,registerForm).then((response)=>{
        if(response.data === 1){
          navigate("/login")
        }
       })
    }
  }
  
  return(
<div class="register">
<form  onSubmit={e => {e.preventDefault();registerUser()}}   id="register-form">
  <h1>Register</h1>
  <p id='or'>or</p>
  {error&&<p style={{fontSize:"15px",color:"red",backgroundColor:"black",borderRadius:"10px",padding:"10px"}}>{error}</p>}
  <Input autoComplete={"off"} bgImg={usernameState} required={true} onChange={(e)=>{handleUsernameChange(e);checkUsernameAvailability(e)}} id={"username"} label={"Username"}></Input>
  <Input autoComplete={"off"} required={true} onChange={handleNameChange} id={"name"} label={"Name"}/>
  <Input  autoComplete={"off"} required={true} onChange={handleEmailChange} id={"email"} label={"Email"}/>

  <div id="user-input">
  <BasicSelect   required={true} onChange={handleRoleChange}  options={rolesOptions} id="Role" label={"Role"}></BasicSelect>
  <Input type={"number"} autoComplete={"off"} required={true} onChange={handleAgeChange} label={"Age"}></Input>
  </div>

  <PasswordField onChange={handlePasswordChange} required={true} label={"Set Password"}></PasswordField>


  <PasswordField bgImg={confirmPassword} required={true} onChange={handleConfirmPasswordChange} label={"Confirm Password"}></PasswordField>

  <div id="user-input">
  <BasicSelect required={true} onChange={handleCountryChange} options={collegeOptions} label={"Country"}></BasicSelect>
  <Input autoComplete={"off"}  required={true} onChange={handlePhoneChange} label={"Phone Number"}/>
  </div>

    <Button type={"submit"}  required={true} action={"Signup"}></Button>

    <p id="global">Already have an Account ? Login <a href='/'>here</a></p>
    <p>if you are part of an Institution you will have  already been given an account, try                                         logging in using your student gmail or Contact your Institution  for more details. 
                  check if your institution is available <a href='/checkAvailability'>here.</a></p>
  </form>
</div>

  )
}

export default Register

