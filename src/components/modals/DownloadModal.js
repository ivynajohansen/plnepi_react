import 'react-datepicker/dist/react-datepicker.css';
import './../../css/style.css';
import React, { useState } from 'react';
import moment from 'moment';
import DateInput from '../DateInput.js';

const DownloadModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [downloadDate, setDownloadDate] = useState(moment().format('DD/MM/YYYY'));
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDatePickerChange = (date) => {
    setDownloadDate(date);
  };

  const handleCheckboxChange = () => {
    setIsDatePickerDisabled(!isDatePickerDisabled);
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

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
      <button className="primary_btn menu ml-2 px-4 py-2" id="productdata_upload" onClick={openModal}>Download data</button>

      {isModalOpen && (
       <div className="modal" id="download_modal">
       <div className="modal-content upload-form">
         <div className="d-flex justify-content-end">
           <span className="close text-right" onClick={closeModal}>&times;</span>
         </div>
         <form className="pt-2 px-5 pb-4" id="download_form" onSubmit={handleSubmit}>
           {/* CSRF token here */}
           <div className="form-title form-group mt-3 mb-4">
             <h3 className="bold">Download Data</h3>
           </div>

           <div className="form-group datepicker">
              <div className='input-group date' id='date_picker_download'>
                  <DateInput
                    selected={moment(downloadDate, 'DD/MM/YYYY').toDate()}
                    onChange={handleDatePickerChange}
                    id="download_date"
                    className="form-control form-input datepicker-control"
                    isDatePickerDisabled={isDatePickerDisabled}
                  />
              </div>
            </div>

           <div className="form-group">
             <label className="font-weight-normal">
               <input
                 type="checkbox"
                 id="disable_date_picker"
                 className="font-weight-normal"
                 checked={isDatePickerDisabled}
                 onChange={handleCheckboxChange}
               /> Download all data
             </label>
           </div>

           <div className="form-group m-0 p-0 mb-3">
             <label className="mt-2 mb-2" htmlFor="format">Please select download extension:</label>
             <select
               id="format"
               name="format"
               className="form-control"
               value={selectedFormat}
               onChange={handleFormatChange}
             >
               <option value="csv">.csv</option>
               <option value="xlsx">.xlsx</option>
             </select>
           </div>

           <div className="d-flex justify-content-end align-items-center">
             <div className="text-right">
               <button
                 className="sub_btn edit mt-3 mb-3"
                 id="product_cancel"
                 onClick={closeModal}
                 type="button"
               >
                 Cancel
               </button>
               <button
                 type="submit"
                 className="submit primary_btn edit mt-3 mb-3"
                 id="modal_download_button"
               >
                 Download
               </button>
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

export default DownloadModal;
