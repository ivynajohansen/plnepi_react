import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faTable,  faFileUpload, faBolt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import 'w3-css/w3.css';
import "@fontsource/inter";

import './../css/style.css';

import Logo from './../images/logo.png';

const Layout = () => {

  let navigate = useNavigate();
  
  const logoutHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt_token');
    try {
      // Send a POST request to the logout API endpoint with the token in the header
      await axios.post('http://plnepi.alldataint.com/api/logout', {}, {
        headers: {
          'Accept' : 'application/json',
          'Content-type' : 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg">
      <header className="w3-sidebar w3-bar-block p-0 m-0">
        <div className="text-center p-4">
          <img style={{ width: '80%' }} className="my-1" src={Logo} alt="Logo" />
        </div>
        <hr className="mt-1" />
        <div className="navbar-container mt-2">
        
          <ul className="navbar ml-auto justify-content-start d-block p-0">
              <li className="nav-item my-1">
                <Link to="/data-product" className="nav-link text-start"><FontAwesomeIcon icon={faTable} /> &nbsp; Data Product</Link>
              </li>
              <li className="nav-item my-1">
                <Link to="/log-activity" className="nav-link text-start"><FontAwesomeIcon icon={faBook} /> &nbsp; Log Activity</Link>
              </li>
              <li className="nav-item my-1">
                <Link to="/log-upload-file" className="nav-link text-start"><FontAwesomeIcon icon={faFileUpload} /> &nbsp; Log Upload File</Link>
              </li>
              <li className="nav-item my-1">
                <Link to="/beban-harian" className="nav-link text-start"><FontAwesomeIcon icon={faBolt} /> &nbsp; Beban Harian</Link>
              </li>
          </ul>
        
        </div>
        <div className="bot">
          <hr className="my-2" />
          <ul className="navbar bottom ml-auto justify-content-start d-block p-0">
            <li className="nav-item w-100">
              <form onSubmit={logoutHandler}>
                <button className="logout-button nav-link text-left w-100" type="submit"><FontAwesomeIcon icon={faSignOutAlt} /> &nbsp; Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </header>
      <div className="rightside p-4" style={{ marginLeft: '18%' }}>
        <div className="content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
