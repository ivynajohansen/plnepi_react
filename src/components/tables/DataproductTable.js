import React from 'react';

import EditModal from '../modals/EditModal';

const DataProductTable = ({ tableData, setCurrentPage, currentPage, totalPages, setShouldUpdate}) => {
  const pageButtons = [];
  const action = 'edit';

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
          <thead className="w-100">
            <tr>
              <td>Product</td>
              <td className="small-column">Quantity</td>
              <td>Price</td>
              <td>Code</td>
              <td>Date</td>
              <td className="text-center small-column">Action</td>
            </tr>
          </thead>
          <tbody className="w-100">
            {tableData.map((item) => (
              <tr key={item.ID}>
                <td>{item.PRODUCT}</td>
                <td>{item.QUANTITY}</td>
                <td>{item.PRICE}</td>
                <td>{item.CODE}</td>
                <td>{formatDate(item.CREATED_AT)}</td>
                <td className="text-center small-column">
                  <EditModal action={action} 
                  initialFormData={{
                    id: item.ID,
                    product: item.PRODUCT,
                    quantity: item.QUANTITY,
                    price: item.PRICE,
                    code: item.CODE,
                  }}
                  setShouldUpdate={setShouldUpdate}
                  />
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

export default DataProductTable;
