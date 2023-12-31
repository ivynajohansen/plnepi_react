import React from 'react';

const LogActivityTable = ({ tableData, setCurrentPage, currentPage, totalPages}) => {
  const pageButtons = [];

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
                    <td>Action</td>
                    <td>Action Date</td>
                    <td>Action Detail</td>
                    <td>IP Address</td>
                    <td>User Agent</td>
                </tr>
            </thead>
            <tbody className = "w-100">
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.user_id}</td>
                  <td>{item.username}</td>
                  <td>{item.action}</td>
                  <td>{formatDate(item.action_date)}</td>
                  <td>{item.action_detail}</td>
                  <td>{item.ip_address}</td>
                  <td>{item.user_agent}</td>
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

export default LogActivityTable;
