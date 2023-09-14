import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const EditModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <button className="sub_btn menu ml-2 px-4 py-2" id="productdata_upload" onClick={openModal}>+ Add Data</button>

      {isModalOpen && (
      <div className="modal" id="edit_modal">
        <div className="modal-content edit-form">
          <div className="d-flex justify-content-end">
            <span className="close text-right" onClick={closeModal}>&times;</span>
          </div>
          <form className="pt-2 px-5 pb-4" id="edit_form" onSubmit={handleSubmit}>
            <div className="form-title form-group mt-3 mb-4 text-left">
              <h3 className="bold modal_title_edit">Add/Edit</h3>
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="product" className="intersecting-label">Product Name</label>
              <input className="form-input" type="text" id="product" name="product" />
            </div>

            <div className="form-group position-relative">
              <label htmlFor="quantity" className="intersecting-label">Quantity</label>
              <input className="form-input d-block" type="number" id="quantity" name="quantity" min="0" style={{ width: '85px' }} />
            </div>

            <div className="form-group position-relative">
              <label htmlFor="price" className="intersecting-label">Price</label>
              <input className="form-input" type="number" id="price" name="price" min="0" />
            </div>

            <div className="form-group mb-3 position-relative">
              <label htmlFor="code" className="intersecting-label">Code</label>
              <input className="form-input" type="text" id="code" name="code" maxLength="10" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="text-left">
                <button className="sub_btn action-button text-danger" id="delete_btn" type="button"><FontAwesomeIcon icon={faTrashAlt} /> &nbsp; Delete</button>
              </div>
              <div className="text-right">
                <button className="sub_btn edit mt-3 mb-3" id="product_cancel" onClick={closeModal} type="button">Cancel</button>
                <button type="submit" className="submit primary_btn edit mt-3 mb-3 ml-1" id="product_save">Save</button>
              </div>
            </div>
            <p className="error_message text-danger p-0 m-0" id="error_message" style={{ fontSize: '12px' }}></p>
          </form>
          <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
        </div>
        
      </div>
      )}
    </div>
  );
};

export default EditModal;
