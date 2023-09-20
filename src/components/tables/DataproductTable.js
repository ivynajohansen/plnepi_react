import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';

const DataProductTable = ({ tableData }) => {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
                  <button className="action-button edit-btn">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        id="pagination_container"
        className="text-center mt-4"
        // data_current_page={currentPage}
        // total_items={totalItems}
      >
      </div>
    </div>
  );
};

export default DataProductTable;
