import React from 'react';

const LogActivityTable = () => {
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

export default LogActivityTable;
