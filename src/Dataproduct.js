import React, { useState, useEffect } from 'react';
import { Spin } from "react-cssfx-loading";

import DataProductTable from './components/tables/DataproductTable';
import axios from 'axios';

import EditModal from './components/modals/EditModal';
import UploadModal from './components/modals/UploadModal';
import DownloadModal from './components/modals/DownloadModal';
import TableQuery from './components/TableQuery';

import { useNavigate } from 'react-router-dom';

function DataProduct() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isFetching, setIsFetching] = useState(false); 
  const [shouldUpdate, setShouldUpdate] = useState(false); 
  const action = "add";

  let navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [searchQuery, limit, currentPage ]);

  useEffect(() => {
    if (shouldUpdate) {
      fetchData();
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://plnepi.alldataint.com/api/data-product`, {
        withCredentials: true,
        params: {
          keyword: searchQuery,
          limit: limit,
          page: currentPage,
        },
      });
      setTableData(response.data.data); // Update the data in your state
      setTotalPages(response.data.last_page); // Update the total pages
      setIsFetching(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error('Error:', error.response.data.error);
      }
    }
  };

  return (
    <>
      <div className="p-2 m-0 ViewBox-title d-flex align-items-center">
        <h3 className="text-dark my-2 ml-2">Data Product</h3>
      </div>
      <div className="ViewBox-content p-2">
  
        <div className="menu text-right d-flex justify-content-end">
          <UploadModal setShouldUpdate={setShouldUpdate}/>
          <DownloadModal/>
          <EditModal action={action} setShouldUpdate={setShouldUpdate}/>
        </div>

        <TableQuery setSearchQuery={setSearchQuery} setLimit={setLimit} limit={limit} />

        <div className="data py-3" id="table_container">
          
          {isFetching ? (
            <div className = "w-100 d-flex justify-content-center">
              <Spin color="#306c84" width="20px" height="20px" className = "text-center" />
            </div>
          ) : (
            <DataProductTable tableData={tableData} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} setShouldUpdate={setShouldUpdate}/>
          )}
        </div>
      </div>
    </>
  );
}

export default DataProduct;
