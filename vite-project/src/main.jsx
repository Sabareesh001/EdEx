import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './authentication/login.jsx';
import './index.css';
import Register from './authentication/register.jsx';
import CheckAvailability from './authentication/checkAvailability.jsx';
import GlobalChat from './globalChat.jsx';
import MyCollegeChat from './MyCollegeChat.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, // Import Navigate
} from 'react-router-dom';

const api_host = import.meta.env.VITE_API_HOST

function App() {
  const [loading, setLoading] = useState(true); // New loading state
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionUser, setSessionUser] = useState({
    username: '',
    userId:'',
    college: '', 
    age: 0,
    phone: '',
    role: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
        if (token) {
      axios.post(`${api_host}/validateUser`, { Auth_token: token }).then(
        (response) => {
          if (response.data === true) {
            setLoggedIn(true);
            setLoading(false); // Update loading state
          } else {
            setLoggedIn(false);
            setLoading(false); // Update loading state
          }
        }
      );
    } else {
      setLoggedIn(false);
      setLoading(false); // Update loading state
    }
   
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while validating
  }

  return (

    <Router>
      
      <Routes>
      <Route
          path="/"
          element={ <GoogleOAuthProvider clientId='64384670382-dvv4o60lvdbiv30pu0crrqlkmggbagu8.apps.googleusercontent.com'>
          <Login loggedIn={loggedIn} sessionUser={sessionUser} setSessionUser={setSessionUser} setLoggedIn={setLoggedIn} />
        </GoogleOAuthProvider>}
        />
        <Route
          path="/login"
          element={
            <GoogleOAuthProvider clientId='64384670382-dvv4o60lvdbiv30pu0crrqlkmggbagu8.apps.googleusercontent.com'>
              <Login loggedIn={loggedIn} sessionUser={sessionUser} setSessionUser={setSessionUser} setLoggedIn={setLoggedIn} />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route path='/checkAvailability' element={<CheckAvailability />} />
        {/* Use Navigate to redirect if not logged in */}
        <Route
          path='/global-chat'
          element={loggedIn ? <GlobalChat  sessionUser={sessionUser}  /> : <Navigate to="/login" />}
        />
        <Route
          path='/my-college-chat'
          element={loggedIn ? <MyCollegeChat /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>

  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
