import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './../css/style.css';

import Login from './../components/login.js';
import Logo from './../images/logo.png';
import LoginImage from './../images/Login PLN Image.png';

const LayoutLogin = ({pageName}) => {

    let content;

    if (pageName === '/login') {
        content = <Login />;
    } 

  return (
    <html lang="en">
      <head>
        <title>PLN EPI</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet' />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css"
        />
        <link rel="icon" href="/images/favicon-32x32.png" type="image/png" />
      </head>
      <body>
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
              {content}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default LayoutLogin;
