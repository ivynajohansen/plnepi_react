import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from "react-cssfx-loading";
import { useNavigate } from 'react-router-dom';
import AddUserModal from './components/modals/AddUserModal';

const UserSettings = () => {
  
  const [userData, setUserData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false); 
  const [shouldUpdate, setShouldUpdate] = useState(false); 

  let navigate = useNavigate();

  const token = localStorage.getItem('jwt_token');

  useEffect(() => {
    if (shouldUpdate) {
      fetchData();
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get('http://plnepi.alldataint.com/api/user-settings', {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        },
      });
      setUserData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        // console.error('Error:', error.response.data.error);
      }
    }

    setIsFetching(false);
  };

  const handleRoleChange = async (userId, newRole) => {
    const data = {
      id: userId,
      role: newRole,
    };
    
    try {
      const response = await axios.put(`http://plnepi.alldataint.com/api/user-settings`, data, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
        <div className="p-2 m-0 ViewBox-title d-flex align-items-center">
          <h3 className="text-dark my-2 ml-2">User Settings</h3>
        </div>
        
            <div className="ViewBox-content p-2">
  
              <div className="menu text-right d-flex justify-content-end">
                <AddUserModal setShouldUpdate={setShouldUpdate}/>
              </div>
              <form className="pt-2 px-5 pb-4" id="edit_form" onSubmit={handleSubmit}>
              <div className="data py-3" id="table_container">
                {isFetching ? (
                  <div className="w-100 d-flex justify-content-center">
                    <Spin color="#306c84" width="20px" height="20px" className="text-center" />
                  </div>
                ) : (
                  <table className="w-100 table-striped" id="data_table">
                    <thead>
                      <tr>
                        <td>Username</td>
                        <td>Superadmin</td>
                        <td>Admin</td>
                        <td>Tamu</td>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>
                            <input
                              defaultChecked={user.role === "superadmin"}
                              type="radio"
                              name={`role_${user.id}`}
                              value="superadmin"
                              onChange={() => handleRoleChange(user.id, "superadmin")}
                            />
                          </td>
                          <td>
                            <input
                              defaultChecked={user.role === "admin"}
                              type="radio"
                              name={`role_${user.id}`}
                              value="admin"
                              onChange={() => handleRoleChange(user.id, "admin")}
                            />
                          </td>
                          <td>
                            <input
                              defaultChecked={user.role === "tamu"}
                              type="radio"
                              name={`role_${user.id}`}
                              value="tamu"
                              onChange={() => handleRoleChange(user.id, "tamu")}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              </form>
            </div>
            
            <p className="error_message text-danger text-right p-0 m-0" id="error_message" style={{ fontSize: '12px', fontWeight: '200' }}>{errorMessage}</p>
        
        <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
    </div>
  );
};

export default UserSettings;
