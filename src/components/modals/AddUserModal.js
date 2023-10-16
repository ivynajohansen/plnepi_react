import React, { useState } from 'react';
import axios from 'axios';
import { Spin } from "react-cssfx-loading";

const AddUserModal = ({setShouldUpdate}) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setErrorMessage(null);
    setisModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setisModalOpen(false);
  };

  const handleSubmit = async (e) => {
    console.log("Submitting");
    e.preventDefault();
    setIsLoading(true);
    const data = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };
    const token = localStorage.getItem('jwt_token');
    
    try {
        const response = await axios.post(`http://plnepi.alldataint.com/api/user-settings`, data, 
        {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json',
            },
        });
        console.log('Response:', response.data);
        setShouldUpdate(true);
        closeModal();
        } catch (error) {
        console.error('Error:', error.response.data.error);
        setErrorMessage(error.response.data.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div>
     
    <button className="sub_btn menu ml-2 px-4 py-2" id="productdata_upload" onClick={openModal}>
        + Add User
    </button>
     

      {isModalOpen && (
      <div className="modal" id="edit_modal">
        <div className="modal-content edit-form">
          <div className="d-flex justify-content-end">
            <span className="close text-right" onClick={closeModal}>&times;</span>
          </div>
          <form className="pt-2 px-5 pb-4" id="add_form" onSubmit={handleSubmit}>
            <div className="form-title form-group mt-3 mb-4 text-left">
              <h3 className="bold modal_title_edit">Add User</h3>
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="username" className="intersecting-label">Username</label>
              <input className="form-input" type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required/>
            </div>

            <div className="form-group position-relative">
              <label htmlFor="first_name" className="intersecting-label">First Name</label>
              <input className="form-input" type="text" id="first_name" name="first_name" value={formData.first_name} required onChange={handleInputChange} />
            </div>

            <div className="form-group position-relative">
              <label htmlFor="last_name" className="intersecting-label">Last Name</label>
              <input className="form-input" type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange}/>
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="email" className="intersecting-label">Email</label>
              <input className="form-input" type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}/>
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="password" className="intersecting-label">Password</label>
              <input className="form-input" type="password" id="password" name="password" minLength="8" value={formData.password} onChange={handleInputChange}/>
            </div>

            <div className="form-group mb-3 position-relative">
                <label className="">Role</label>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="superadmin"
                    id="superadmin"
                    onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="superadmin">Superadmin</label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="admin"
                    id="admin"
                    onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="admin">Admin</label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="tamu"
                    id="tamu"
                    onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="user">Tamu</label>
                </div>
                </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-right d-flex align-items-center">
                <button className="sub_btn edit mt-3 mb-3" id="product_cancel" onClick={closeModal} type="button">Cancel</button>
                <button type="submit" className="submit primary_btn edit mt-3 mb-3 ml-1" id="product_save">
                  {isLoading ? (
                   <Spin color="#FFFFFF" width="20px" height="20px" className='my-1 mx-2'/> 
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
            <p className="error_message text-danger text-right p-0 m-0" id="error_message" style={{ fontSize: '12px', fontWeight: '200' }}>{errorMessage}</p>
          </form>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default AddUserModal;
