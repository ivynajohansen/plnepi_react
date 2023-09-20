import React from 'react';

const DataProductTable = () => {
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
