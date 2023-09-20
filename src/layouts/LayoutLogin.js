import React from 'react';

import './../css/style.css';

import { Link, Outlet } from 'react-router-dom';
import Logo from './../images/logo.png';
import LoginImage from './../images/Login PLN Image.png';

const LayoutLogin = () => {

  return (
    <div className="bg m-0 d-flex justify-content-end overflow-hidden">
      <div className="img-container">
        <img
          style={{ width: '75%' }}
          className="mb-3"
          src={LoginImage}
          alt="Login PLN Image"
        />
      </div>
      <div className="form-container justify-content-center align-items-center login-container">
        <div className="FormBox mx-0 pt-5 text-center">
          <img
            style={{ height: '80px' }}
            className="mt-3 mb-2"
            src={Logo}
            alt="Logo"
          />
          <Outlet/>
        </div>
      </div>
    </div>
    
  );
}

export default LayoutLogin;
