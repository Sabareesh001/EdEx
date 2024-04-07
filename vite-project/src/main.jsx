import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './authentication/login.jsx'
import './index.css'
import Register from './authentication/register.jsx'
import CheckAvailability from './authentication/checkAvailability.jsx'
import GlobalChat from './globalChat.jsx'
import MyCollegeChat from './MyCollegeChat.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login></Login>}
      />
      <Route
      path="/register"
      element={<Register></Register>}
      />
      <Route path='/checkAvailability' element={<CheckAvailability></CheckAvailability>}
      />
      <Route path='/global-chat' element={<GlobalChat/>}/>
      <Route path='/my-college-chat' element={<MyCollegeChat/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
