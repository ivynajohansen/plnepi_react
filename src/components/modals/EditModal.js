import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { Spin } from "react-cssfx-loading";
import DeleteModal from './DeleteModal';
import { useNavigate } from 'react-router-dom';

const EditModal = ({action, initialFormData, setShouldUpdate}) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData || {});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  let content;
  let title;
  let navigate = useNavigate();

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
    e.preventDefault();
    setIsLoading(true);
    const data = {
      id: formData.id,
      product: formData.product,
      quantity: formData.quantity,
      price: formData.price,
      code: formData.code,
    };
    const token = localStorage.getItem('jwt_token');
    if (action === 'edit'){
      try {
        const response = await axios.put(`http://plnepi.alldataint.com/api/data-product`, data, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response:', response.data);
        setShouldUpdate(true);
        // Close the modal or perform other actions as needed
        closeModal();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          setErrorMessage(error.response.data.error);
        }
        
      }
    }
    else {
      try {
        const response = await axios.post(`http://plnepi.alldataint.com/api/data-product`, data, 
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
        // Handle errors here
        console.error('Error:', error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    }

    setIsLoading(false);
  };

  if (action === 'edit') {
    title = 'Edit';
    content = <DeleteModal id={formData.id} setShouldUpdate={setShouldUpdate}/>
  } 
  else {
      title = 'Add';
  }

  return (
    <div>
      {action === 'add' ? (
        <button className="sub_btn menu ml-2 px-4 py-2" id="productdata_upload" onClick={openModal}>
          + Add Data
        </button>
      ) : (
        <button className="action-button edit-btn" onClick={openModal}  >
          <FontAwesomeIcon icon={faPen} />
        </button>
      )}

      {isModalOpen && (
      <div className="modal" id="edit_modal">
        <div className="modal-content edit-form">
          <div className="d-flex justify-content-end">
            <span className="close text-right" onClick={closeModal}>&times;</span>
          </div>
          <form className="pt-2 px-5 pb-4" id="edit_form" onSubmit={handleSubmit}>
            <div className="form-title form-group mt-3 mb-4 text-left">
              <h3 className="bold modal_title_edit">{title}</h3>
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="product" className="intersecting-label">Product Name</label>
              <input className="form-input" type="text" id="product" name="product" value={formData.product} onChange={handleInputChange} />
            </div>

            <div className="form-group position-relative">
              <label htmlFor="quantity" className="intersecting-label">Quantity</label>
              <input className="form-input d-block" type="number" id="quantity" name="quantity" min="0" value={formData.quantity} onChange={handleInputChange} style={{ width: '85px' }} />
            </div>

            <div className="form-group position-relative">
              <label htmlFor="price" className="intersecting-label">Price</label>
              <input className="form-input" type="number" id="price" name="price" min="0" value={formData.price} onChange={handleInputChange}/>
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="code" className="intersecting-label">Code</label>
              <input className="form-input" type="text" id="code" name="code" maxLength="10" value={formData.code} onChange={handleInputChange}/>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-left">
                {content}   
              </div>
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
          <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default EditModal;
