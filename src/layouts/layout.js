import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faTable,  faFileUpload, faBolt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import 'w3-css/w3.css';
import "@fontsource/inter";

import './../css/style.css';

import Logo from './../images/logo.png';

import DataProduct from '../dataproduct';
import LogActivity from '../logActivity';
import LogUploadFile from '../logUploadFile';
import BebanHarian from '../bebanHarian';

const Layout = ({pageName}) => {

  let content;

    if (pageName === '/data-product') {
        content = <DataProduct />;
    } 
    else if (pageName === '/log-activity') {
        content = <LogActivity />;
    }  
    else if (pageName === '/log-upload-file') {
      content = <LogUploadFile />;
    }  
    else if (pageName === '/beban-harian') {
      content = <BebanHarian />;
    }  


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
              <a href="/data-product" className="nav-link text-start"><FontAwesomeIcon icon={faTable} /> &nbsp; Data Product</a>
            </li>
            <li className="nav-item my-1">
              <a href="/log-activity" className="nav-link text-start"><FontAwesomeIcon icon={faBook} /> &nbsp; Log Activity</a>
            </li>
            <li className="nav-item my-1">
              <a href="/log-upload-file" className="nav-link text-start"><FontAwesomeIcon icon={faFileUpload} /> &nbsp; Log Upload File</a>
            </li>
            <li className="nav-item my-1">
              <a href="/beban-harian" className="nav-link text-start"><FontAwesomeIcon icon={faBolt} /> &nbsp; Beban Harian</a>
            </li>
          </ul>
        </div>
        <div className="bot">
          <hr className="my-2" />
          <ul className="navbar bottom ml-auto justify-content-start d-block p-0">
            <li className="nav-item w-100">
              <form action="{{ route('logout') }}" method="POST">
                <button className="logout-button nav-link text-left w-100" type="submit"><FontAwesomeIcon icon={faSignOutAlt} /> &nbsp; Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </header>
      <div className="rightside p-4" style={{ marginLeft: '18%' }}>
        <div className="content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Layout;
