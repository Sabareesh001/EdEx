import React,{ useState } from 'react'
import Button from './components/button.jsx'
import './login.css'
import Input from './components/input.jsx'
import PasswordField from './components/password.jsx'
import BasicSelect from './components/select.jsx'
function App(){
  return(
<div class="login">
<form  onSubmit={e => {e.preventDefault();}}   id="login-form">
  <h1>Login</h1>
  <div class="sign-in-with-google">
    <button><img height="40px" width="40px" src="google.png"/>
    <p>Sign in with google</p>
    </button>
  </div>
  <br></br>
  <p id='or'>or</p>
  <br></br>
  <div id="user-input">
  <BasicSelect label={"College"}></BasicSelect>
  <Input label={"User Id"}></Input>
  </div>
  
  <br></br>
  <PasswordField label={"Password"}></PasswordField>
  <br></br>
    <Button action={"Login"}></Button>
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

