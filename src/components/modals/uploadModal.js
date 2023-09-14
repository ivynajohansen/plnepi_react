
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import './../../css/style.css';
import React, { useState } from 'react';

const UploadModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [uploadDate, setUploadDate] = useState(new Date());
  const [uploadTime, setUploadTime] = useState('12:00');
  const [fileDescription, setFileDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      <button className="primary_btn menu ml-2 px-4 py-2" id="productdata_upload" onClick={openModal}>Upload data</button>

      {isModalOpen && (
       <div className="modal" id="upload_modal">
       <div className="modal-content upload-form">
         <div className="d-flex justify-content-end">
           <span className="close text-right" onClick={closeModal}>&times;</span>
         </div>
         <form className="pt-2 px-5 pb-4" id="upload_form" onSubmit={handleSubmit} encType="multipart/form-data">
           {/* CSRF token here */}
           <div className="form-title form-group mt-3 mb-4">
             <h3 className="bold">Upload Data</h3>
           </div>
           <div className="form-group d-flex">
             <div className="form-group">
               <DatePicker
                 selected={uploadDate}
                 onChange={(date) => setUploadDate(date)}
                 dateFormat="dd/MM/yyyy"
                 id="upload_date"
                 className="form-control form-input"
               />
             </div>
             <div className="ml-2">
               <TimePicker
                 onChange={(time) => setUploadTime(time)}
                 value={uploadTime}
                 id="upload_time"
                 format="HH:mm"
                 className="form-control form-input"
               />
             </div>
           </div>
 
           <div className="form-group m-0 p-0 mt-1">
             <div className="form-group mb-3 position-relative w-100">
               <input
                 className="form-input w-100 form-control"
                 id="file_name"
                 type="text"
                 placeholder="Upload file"
               />
               <label htmlFor="file_choose" className="button-inside-input">Choose File</label>
               <input
                 type="file"
                 id="file_choose"
                 name="file_choose"
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                 style={{ display: 'none' }}
                 required
               />
             </div>
             <div className="form-group mb-3 position-relative mt-5">
               <label htmlFor="description" className="intersecting-label">Description</label>
               <textarea
                 className="form-input w-100"
                 id="description"
                 name="description"
                 style={{ height: '5em' }}
                 value={fileDescription}
                 onChange={(e) => setFileDescription(e.target.value)}
               ></textarea>
             </div>
           </div>
           <div className="d-flex justify-content-end align-items-center">
             <div className="text-right">
               <button className="sub_btn edit mt-3 mb-3" id="product_cancel" onClick={closeModal} type="button">Cancel</button>
               <button type="submit" className="submit primary_btn edit mt-3 mb-3" id="upload_save">Upload</button>
             </div>
           </div>
           <p className="error_message text-danger p-0 m-0" id="error_message" style={{ fontSize: '12px' }}>{errorMessage}</p>
         </form>
       </div>
     </div>
      )}
    </div>
  );
};

export default UploadModal;
