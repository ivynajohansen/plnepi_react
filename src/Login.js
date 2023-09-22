import React, { useState, useEffect } from 'react';
import { Spin } from "react-cssfx-loading";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false); 

  const [validation, setValidation] = useState('');
  let navigate = useNavigate();
  
  const loginHandler = async (e) => {
    
    e.preventDefault();
    setIsLogging(true);
    
    const requestData = {
      username: username,
      password: password,
    };

    //send data to server
    try {
      const response = await axios.post('http://plnepi.alldataint.com/api/login', requestData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      if (error.response.data.username) {
        setValidation(error.response.data.username[0]);
      } else if (error.response.data.password) {
        setValidation(error.response.data.password[0]);
      } else {
        setValidation(error.response.data.message);
      }
    } finally {
      setIsLogging(false); // Stop loading animation
    }
  };

  return (
    <div>
      <form className="form pt-2 px-5 pb-4" id="login_form" onSubmit={loginHandler}>
        <div className="form-title form-group mt-5 mb-3">
          <h2 className="bold text-center">SIGN IN</h2>
        </div>

        <div className="d-flex justify-content-center px-5">
          <div className="form-group m-0 p-0 mt-2 px-4">
            <div className="form-group mb-3">
              <div className="d-flex justify-content-center">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-center">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center">
            {isLogging ? (
              <button type="button" className="primary_btn mt-4 mb-3 px-5" id="customerlogin_submit"><Spin color="#FFFFFF" width="20px" height="20px"/></button>
            ) : (
              <button type="submit" className="primary_btn mt-4 mb-3 px-5" id="customerlogin_submit">Login</button>
            )}
          
          
          {
              validation && (
                  <div className="error-message text-danger p-0 m-0">
                      {validation}
                  </div>
              )
          }
        </div>
      </form>
    </div>
  );
}

export default Login;
