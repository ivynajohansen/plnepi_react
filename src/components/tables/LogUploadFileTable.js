import React, { useState } from 'react';
import { Spin } from "react-cssfx-loading";

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const LogUploadFileTable = ({ tableData, setCurrentPage, currentPage, totalPages}) => {
  const pageButtons = [];
  const [fetchingRow, setFetchingRow] = useState(null); 
  const token = localStorage.getItem('jwt_token');
  const downloadFile = async (file_name) => {
    try {
      const response = await axios.get(`http://plnepi.alldataint.com/api/log-upload-file/` + encodeURIComponent(file_name), {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const blobURL = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobURL;
      link.download = file_name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setFetchingRow(null);
    } catch (error) {
      console.error(error);
      setFetchingRow(null);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const maxPages = 10;
  for (let page = 1; page <= totalPages; page++) {
    if (page <= maxPages || page > totalPages - 2) {
      pageButtons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      );
    } else if (page === maxPages + 1) {
      pageButtons.push( <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={currentPage === page ? 'active' : ''}
      ><span key={page}>...</span></button>);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Update the current page
  };

  return (
    <div>
      <div id="table_loading_overlay" className="overlay text-center justify-content-center">
        <div className="spinner spinner-dark ml-2"></div>
      </div>

      <div className="w-100 overflow-auto">
        <table className="w-100 table-striped" id="data_table">
            <thead className = "w-100">
                <tr>
                    <td>User ID</td>
                    <td>Username</td>
                    <td>Date Upload</td>
                    <td>File Name</td>
                    <td>File Description</td>
                    <td className="text-center">Action</td>
                </tr>
            </thead>
            <tbody className = "w-100">
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.user_id}</td>
                  <td>{item.username}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.file_name}</td>
                  <td>{item.file_description}</td>
                  <td className="text-center small-column">
                    {fetchingRow === item.id ? (
                      <button className="action-button edit-btn" disabled>
                        <Spin color="#306c84" width="20px" height="20px" className = "text-center" />
                      </button>
                    ) : (
                      <button
                        className="action-button edit-btn"
                        onClick={() => {
                          setFetchingRow(item.id);
                          // Add your download logic here
                          downloadFile(item.file_name);
                        }}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      <div className="pagination pt-4 d-flex justify-content-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'⏴'}
        </button>
        {pageButtons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'⏵'}
        </button>
      </div>
    </div>
  );
};

export default LogUploadFileTable;
