import React, { useState } from 'react';

import BebanHarianTable from './components/tables/BebanHarianTable';
import TableQuery from './components/TableQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function BebanHarian() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <>
      <div className="p-2 m-0 ViewBox-title d-flex align-items-center">
        <h3 className="text-dark my-2 ml-2">Beban Harian</h3>
      </div>
      <div className="ViewBox-content p-2">

        <TableQuery onSearch={setSearchQuery} onLimitChange={setLimit} />

        <div className="data py-3" id="table_container">
          <BebanHarianTable/>
        </div>
      </div>
    </>
  );
}

export default BebanHarian;
