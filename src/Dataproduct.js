import React, { useState, useEffect } from 'react';
import { Spin } from "react-cssfx-loading";

import DataProductTable from './components/tables/DataproductTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import EditModal from './components/modals/EditModal';
import UploadModal from './components/modals/UploadModal';
import DownloadModal from './components/modals/DownloadModal';
import TableQuery from './components/TableQuery';

function DataProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isFetching, setIsFetching] = useState(false); 

  useEffect(() => {
    fetchData();
  }, [searchQuery, limit]);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://plnepi.alldataint.com/api/data-product`, {
        params: {
          search: searchQuery,
          per_page: limit,
          page: currentPage,
        },
      });
      setTableData(response.data.data); // Update the data in your state
      setTotalPages(response.data.last_page); // Update the total pages
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

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

        <TableQuery onSearch={setSearchQuery} onLimitChange={setLimit} />

        <div className="data py-3" id="table_container">
          
          {isFetching ? (
            <div className = "w-100 d-flex justify-content-center">
              <Spin color="#306c84" width="20px" height="20px" className = "text-cente" />
            </div>
          ) : (
            <DataProductTable tableData={tableData}/>
          )}
        </div>
      </div>
    </>
  );
}

export default DataProduct;
