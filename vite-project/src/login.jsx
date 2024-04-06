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
  </form>
</div>

  )
}

export default App

