import React, { useState, useEffect } from 'react';
import { Spin } from "react-cssfx-loading";

import BebanHarianTable from './components/tables/BebanHarianTable';
import axios from 'axios';
import TableQuery from './components/TableQuery';

import { useNavigate } from 'react-router-dom';

function BebanHarian() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [mwData, setMWData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isFetching, setIsFetching] = useState(false); 

  let navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [searchQuery, limit, currentPage]);

  const fetchData = async () => {
    setIsFetching(true);
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await axios.get(`http://plnepi.alldataint.com/api/beban-harian`, {
        params: {
          keyword: searchQuery,
          limit: limit,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json',
        },
      });
      setTableData(response.data.data); // Update the data in your state
      setMWData(response.data.mw_data)
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
        <h3 className="text-dark my-2 ml-2">Beban Harian</h3>
      </div>
      <div className="ViewBox-content p-2">

        <TableQuery setSearchQuery={setSearchQuery} setLimit={setLimit} />

        <div className="data py-3" id="table_container">
          {isFetching ? (
            <div className = "w-100 d-flex justify-content-center">
              <Spin color="#306c84" width="20px" height="20px" className = "text-cente" />
            </div>
          ) : (
            <BebanHarianTable tableData={tableData} mwData={mwData} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
          )}
        </div>
      </div>
    </>
  );
}

export default BebanHarian;
