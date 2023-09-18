import React, { useState } from 'react';

import DataProductTable from './components/tables/dataproductTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import EditModal from './components/modals/editModal';
import UploadModal from './components/modals/uploadModal';
import DownloadModal from './components/modals/downloadModal';

function DataProduct() {

  return (
    <>
      <div className="p-2 m-0 ViewBox-title d-flex align-items-center">
        <h3 className="text-dark my-2 ml-2">Data Product</h3>
      </div>
      <div className="ViewBox-content p-2">
  
        <div className="menu text-right d-flex justify-content-end">
          <UploadModal/>
          <DownloadModal/>
          <EditModal/>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <form action="" method="get">
            <label htmlFor="limit" className='mr-2'>Items per page:</label>
            <select name="limit" id="limit" onchange="">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </form>

          <form id="search_form">
            <input type="search" id="keyword" name="keyword" placeholder="Search..." className="form-input"
            value=""></input>
            <button type="submit" className="sub_btn search-button action-button ml-2"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>

        <div className="data py-3" id="table_container">
          <DataProductTable/>
        </div>
      </div>
    </>
  );
}

export default DataProduct;
