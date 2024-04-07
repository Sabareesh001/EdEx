import React,{ useState } from 'react'
import Button from '../components/button.jsx'
import './register.css'
import Input from '../components/input.jsx'
import PasswordField from '../components/password.jsx'
import BasicSelect from '../components/select.jsx'
function Register(){
  return(
<div class="register">
<form  onSubmit={e => {e.preventDefault();}}   id="register-form">
  <h1>Register</h1>
  <div class="sign-up-with-google">
    <button><img height="40px" width="40px" src="google.png"/>
    <p>&nbsp; Sign up with google</p>
    </button>
  </div>
  <p id='or'>or</p>
  <br></br>
  <Input label={"Username"}/>
  <br></br>
  <br></br>
  <Input label={"Email"}/>
  <br></br>

  <br></br>
  <div id="user-input">
  <BasicSelect label={"Role"}></BasicSelect>
  <Input label={"Age"}></Input>
  </div>
  <br></br>
  <PasswordField label={"Set Password"}></PasswordField>
  <br></br>
  <br></br>
  <PasswordField label={"Confirm Password"}></PasswordField>
  <br></br>
  <br></br>
  <div id="user-input">
  <BasicSelect label={"Country"}></BasicSelect>
  <Input label={"Phone Number"}/>
  </div>
  <br></br>
    <Button action={"Signup"}></Button>
    <br>
    </br>
    <p id="global">Already have an Account ? Login <a href='/'>here</a></p>
    <p>if you are part of an Institution you will have  already been given an account, try                                         logging in using your student gmail or Contact your Institution  for more details. 
                  check if your institution is available <a href='/checkAvailability'>here.</a></p>
  </form>
</div>

  )
}

export default Register

