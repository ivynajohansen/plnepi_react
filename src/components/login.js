import React, { useState } from 'react';

function Login() {
  // Define state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission logic here
    // For example, sending a POST request to a server
    // using fetch or an API library.
  };

  return (
    <div>
      <form className="form pt-2 px-5 pb-4" id="login_form" onSubmit={handleSubmit}>
        <div className="form-title form-group mt-5 mb-3">
          <h3 className="bold">SIGN IN</h3>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-group m-0 p-0 mt-2">
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
          <button type="submit" className="primary_btn mt-4 mb-3 px-5" id="customerlogin_submit">
            Login
          </button>
          {/* Display validation errors */}
          {/* For React, you can conditionally render error messages */}
          {usernameError && <p className="error-message text-danger p-0 m-0">Username error message</p>}
          {passwordError && <p className="error-message text-danger p-0 m-0">Password error message</p>}
        </div>
      </form>
    </div>
  );
}

export default Login;
