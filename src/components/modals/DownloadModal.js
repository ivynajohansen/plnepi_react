import 'react-datepicker/dist/react-datepicker.css';
import './../../css/style.css';
import { Spin } from "react-cssfx-loading";
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateInput from '../DateInput.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DownloadModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const [date, setDate] = React.useState(dayjs());
  const [formatDate, setFormatDate] = React.useState(dayjs().format("DD/MM/YYYY"));

  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);
  const [format, setFormat] = useState('csv');
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFormatDate(dayjs(date).format("DD/MM/YYYY"));
  }, [date]);

  const downloadHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await axios.get(`http://plnepi.alldataint.com/api/data-product/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        },
        params: {
          format: format,
          date: isDatePickerDisabled ? "all" : formatDate
        },
        responseType: 'blob'
      });

      console.log('Response Headers:', response.headers);
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data-product." + format;

      if (format === "xlsx") {
        link.type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

      link.style.display = "none";
      
    
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Error:', error);
      }
    } finally {
      setIsLoading(false);
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
                  className="form-control form-input datepicker-control"
                  id="datepicker"
                  isDatePickerDisabled={isDatePickerDisabled}
                  date={date}
                  setDate={setDate}
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
             <div className="text-right d-flex align-items-center">
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
                 {isLoading ? (
                   <Spin color="#FFFFFF" width="20px" height="20px" className='my-1 mx-2'/> 
                  ) : (
                    "Download"
                  )}
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
