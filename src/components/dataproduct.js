import React, { useState } from 'react';

function DataProduct() {

  return (
    <div className="DataProduct">
      <div className="p-2 m-0 ViewBox-title d-flex align-items-center">
        <h3 className="text-dark my-2 ml-2">Data Product</h3>
      </div>
      <div className="ViewBox-content p-2">
        {/* Other HTML/JSX elements and components */}
        {/* You can use state variables and functions to handle interactions */}
        {/* Example: */}
        <button className="primary_btn menu ml-2 px-4 py-2" id="productdata_upload" onClick="">Upload Data</button>
        <button class="primary_btn menu ml-2 px-4 py-2" id="productdata_download" onClick="">Download Data</button>
        <button class="sub_btn menu ml-2 px-4 py-2" id="add_data" onClick="">+ Add Data</button>
        {/* Add more elements and components */}
      </div>
    </div>
  );
}

export default DataProduct;
