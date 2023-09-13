import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './../css/style.css';

import Logo from './../images/logo.png';
import DataProduct from '../components/dataproduct';

const Layout = ({pageName}) => {

  let content;

    if (pageName === '/data-product') {
        content = <DataProduct />;
    } 

  return (
    <div className="bg">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
      <header className="w3-sidebar w3-bar-block p-0 m-0">
        <div className="text-center p-4">
          <img style={{ width: '80%' }} className="my-1" src={Logo} alt="Logo" />
        </div>
        <hr className="mt-1" />
        <div className="navbar-container mt-2">
          <ul className="navbar ml-auto justify-content-start d-block p-0">
            <li className="nav-item my-1">
              <a href="/data-product" className="nav-link text-start">&#xf0ce; &nbsp; Data Product</a>
            </li>
            <li className="nav-item my-1">
              <a href="/log-activity" className="nav-link text-start">&#xf02d; &hairsp; &hairsp; Log Activity</a>
            </li>
            <li className="nav-item my-1">
              <a href="/log-upload-file" className="nav-link text-start">&hairsp; &#xf574; &nbsp; Log Upload File</a>
            </li>
            <li className="nav-item my-1">
              <a href="/beban-harian" className="nav-link text-start">&hairsp; &#xf0e7; &nbsp; Beban Harian</a>
            </li>
          </ul>
        </div>
        <div className="bot">
          <hr className="my-2" />
          <ul className="navbar bottom ml-auto justify-content-start d-block p-0">
            <li className="nav-item w-100">
              <form action="{{ route('logout') }}" method="POST">
                <button className="logout-button nav-link text-left w-100" type="submit">&#xf2f5; &nbsp; Logout</button>
              </form>
            </li>
          </ul>
        </div>
      </header>
      <div className="rightside p-4" style={{ marginLeft: '18%' }}>
        <div className="content">
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
