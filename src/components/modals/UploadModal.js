import 'react-datepicker/dist/react-datepicker.css';
import './../../css/style.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import dayjs from 'dayjs';
import DateInput from '../DateInput.js';
import TimeInput from '../TimeInput.js';

const UploadModal = ({setShouldUpdate}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [date, setDate] = React.useState(dayjs());
  const [formatDate, setFormatDate] = React.useState(dayjs().format("DD/MM/YYYY"));

  const [time, setTime] = React.useState(dayjs());
  const [formatTime, setFormatTime] = React.useState(dayjs().format("HH:mm"));

  const [fileDescription, setFileDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setFormatDate(dayjs(date).format("DD/MM/YYYY"));
  }, [date]);

  useEffect(() => {
    setFormatTime(dayjs(time).format("HH:mm"));
  }, [time]);


  const openModal = () => {
    setIsModalOpen(true);
    setFileName(null);
    setDate(dayjs());
    setTime(dayjs());
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length === 0) {
      setFileName(''); // No file selected, reset the fileName state
    } else {
      setFileName(fileInput.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file_choose', e.target.file_choose.files[0]);
    formData.append('date', formatDate);
    formData.append('time', formatTime);
    formData.append('description', fileDescription);
    try {
      const response = await Axios.post('http://plnepi.alldataint.com/api/data-product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      });
      setShouldUpdate(true);
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      // setErrorMessage(error.response);
    }
    
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
           <div className="form-title form-group mt-3 mb-4">
             <h3 className="bold">Upload Data</h3>
           </div>
           <div className="form-group d-flex datepicker w-100">
             <div className="form-group w-50">
               <DateInput
                  className="form-control form-input datepicker-control"
                  id="datepicker"
                  date={date}
                  setDate={setDate}
                  isDatePickerDisabled={false}
               /> 
             </div>
             <div className="ml-2 w-50 timepicker">
               <TimeInput
                 id="upload_time"
                 className="form-control form-input w-100"
                 time={time}
                 setTime={setTime}
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
                  defaultValue={fileName}
               />
               <label htmlFor="file_choose" className="button-inside-input">Choose File</label>
               <input
                 type="file"
                 id="file_choose"
                 name="file_choose"
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                 onChange={handleFileChange}
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
