import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './authentication/login.jsx'
import './index.css'
import Register from './authentication/register.jsx'
import CheckAvailability from './authentication/checkAvailability.jsx'
import ResponsiveDrawer from './components/responsiveDrawer.jsx'
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
      <Route path='/home' element={<ResponsiveDrawer list={['Global','My College','Profile']} title={"EdEx"}></ResponsiveDrawer>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
