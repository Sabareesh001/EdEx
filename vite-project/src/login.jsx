import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from './components/button.jsx'
import './login.css'

function App(){
  return(
<div class="login">
<form id="login-form">
  <h1>Login</h1>
  <div class="sign-in-with-google">
    <button><img height="40px" width="40px" src="google.png"/>
    <p>Sign in with google</p>
    </button>
  </div>
  <br></br>
  <p id='or'>or</p>
  <br></br>
  <div class="user-id">
  <select>
  </select>
    <input placeholder='UserID' id="userid"/>
    </div>
    <br></br>
    <input placeholder='password' id="password"/>
    <br></br>
    <Button action={"Login"}></Button>
    <br>
    </br>
    <p id="global">Don’t have an Account ? Join as a Global Member <a href='#'>here</a></p>
    <p>if you are part of an Institution you will have  already been given an account, try                                         logging in using your student gmail or Contact your Institution  for more details. 
                  check if your institution is available <a href='#'>here.</a></p>
  </form>
</div>

  )
}

export default App

