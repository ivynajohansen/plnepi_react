import 'react-datepicker/dist/react-datepicker.css';
import './../../css/style.css';
import { Spin } from "react-cssfx-loading";
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DateInput from '../DateInput.js';
import axios from 'axios';

const DownloadModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const [date, setDate] = useState(moment().format('DD/MM/YYYY')); 
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);
  const [format, setFormat] = useState('csv');
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const inputElement = document.querySelector(".MuiInputBase-input");
    const baseElement = document.querySelector(".css-4jnixx-MuiStack-root>.MuiTextField-root");
    const calendarElement = document.querySelector(".MuiButtonBase-root");
  
    if (inputElement) {
      console.log("Disabling");
      inputElement.disabled = isDatePickerDisabled;
      baseElement.disabled = isDatePickerDisabled;
      calendarElement.disabled = isDatePickerDisabled;
    }

    console.log(isDatePickerDisabled);
  }, [isDatePickerDisabled]);

  const downloadHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isDatePickerDisabled){
      console.log("All");
    }
    else{
      console.log(date);
    }

    const requestData = {
      date: isDatePickerDisabled ? "all" : date, // Use the separate state variable
      format: format,
    };

    try {
      const response = await axios.get(`http://plnepi.alldataint.com/api/data-product/download`, requestData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const blobURL = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobURL;
      link.download = "data-product." + format;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }

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
         <form className="pt-2 px-5 pb-4" id="download_form" onSubmit={downloadHandler}>
           {/* CSRF token here */}
           <div className="form-title form-group mt-3 mb-4">
             <h3 className="bold">Download Data</h3>
           </div>

           <div className="form-group datepicker">
              <div className='input-group date' id='date_picker_download'>
                <DateInput
                  selected={date}
                  onChange={(newDate) => setDate(newDate)}
                  className="form-control form-input datepicker-control"
                  id="datepicker"
                />
               
              </div>
            </div>

           <div className="form-group">
             <label className="font-weight-normal">
               <input
                 type="checkbox"
                 className="font-weight-normal"
                 checked={isDatePickerDisabled}
                 onChange={(e) => setIsDatePickerDisabled(e.target.checked)}
               /> Download all data
             </label>
           </div>

           <div className="form-group m-0 p-0 mb-3">
             <label className="mt-2 mb-2" htmlFor="format">Please select download extension:</label>
             <select
               id="format"
               name="format"
               className="form-control"
               value={format}
               onChange={(e) => setFormat(e.target.value)}
             >
               <option value="csv">.csv</option>
               <option value="xlsx">.xlsx</option>
             </select>
           </div>

           <div className="d-flex justify-content-end align-items-center">
             <div className="text-right">
               <button
                 className="sub_btn edit mt-3 mb-3 mr-2"
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
