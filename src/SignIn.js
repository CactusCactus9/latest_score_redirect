import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Banner from './components/Banner';
import './SignIn.css'
import { Si42 } from "react-icons/si";
// import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (login(username, password)) {
        // setError('');
        console.log('Logged in successfully!');
      };
    }
    //  else {
    //   setError('Invalid credentials');
    // }
    
    // const navigate = useNavigate();
    const handleClickCreateAccount = () =>{
      console.log('Logged in successfully!');
    }
    return (
      <div className='sin-container'>
        <div className='sin-banner'><Banner /></div>
        <div className='sin-container-content'>
            <div className='sin-title-welcome'>Welcome Back</div>
            <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='sin-input'
              />
            </div>
            <div>
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='sin-input'
              />
            </div>
            <div><button type="submit" className='sin-button-login'>Login</button></div>
            <div className="sin-create-account"><div> Don't have account?</div><div onClick={handleClickCreateAccount} className="sin-create-account-button">Sign up</div></div>
            <div className="sin-text-or">Or</div>
            <div className="sin-login-by"><div className="sin-login-intra"><Si42 /></div></div>
            </form>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </div>
          
      </div> 
    );
  };
  
  export default SignIn;