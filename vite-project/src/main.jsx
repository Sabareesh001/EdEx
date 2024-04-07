import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './login.jsx'
import './index.css'
import Register from './register.jsx'
import CheckAvailability from './checkAvailability.jsx'
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
      </Routes>
    </Router>
  </React.StrictMode>,
)
