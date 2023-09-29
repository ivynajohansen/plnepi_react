import 'react-datepicker/dist/react-datepicker.css';
import './../../css/style.css';
import { Spin } from "react-cssfx-loading";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({id, setShouldUpdate}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
    console.log(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      const response = await axios.delete(`http://plnepi.alldataint.com/api/data-product`, {
        data: { id }
      });
      console.log('Response:', response.data);
      setShouldUpdate(true);
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Error:', error.response.data.error);
      }
    }
    
    setIsDeleting(false);
  };

  return (
    <div>
      <button className="sub_btn action-button text-danger" id="delete_btn" type="button" onClick={openModal}><FontAwesomeIcon icon={faTrashAlt}/> &nbsp; Delete</button>

      {isModalOpen && (
       <div className="modal submodal" id="confirm_modal">
        <div className="modal-content submodal-content edit-form">
          <div className="d-flex justify-content-end">
            <span className="close text-right" onClick={closeModal}>&times;</span>
          </div>
          
          <div className="form-title form-group mt-3 mb-3 text-center">
            <h3 className="bold">Confirm Delete?</h3>
          </div>

          {/* buttons */}
          <div className="d-flex justify-content-center align-items-center mb-2">
            <div className="d-flex text-center">
              <button className="sub_btn edit mt-3 mb-3 mr-1" id="delete_cancel" onClick={closeModal} type="button">Cancel</button>
              <button className="submit primary_btn edit mt-3 mb-3 bg-danger" id="delete_confirm" type="submit" onClick={handleDelete}>Delete</button>
            </div>
          </div>

          
        </div>
      </div>
      )}
    </div>
  );
};

export default DeleteModal;
