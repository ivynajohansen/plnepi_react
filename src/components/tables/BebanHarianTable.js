import React from 'react';

const BebanHarianTable = ({ tableData, setCurrentPage, currentPage, totalPages, mwData}) => {
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
        <table className="w-100 table-striped freeze" id="data_table">
            <thead className = "w-100">
                <tr>
                    <td>Wilayah</td>
                    <td className="small-column">Jenis Pembangkit</td>
                    <td>Date</td>
                    {mwData && mwData.length > 0 && (
                      Object.keys(mwData[1]).map((key) => (
                        <td className="small-column" key={key}>
                          {key}
                        </td>
                      ))
                    )}
                </tr>
            </thead>
            <tbody className = "w-100">
              {tableData.map((item, i) => (
                <tr key={item.ID}>
                  <td>{item.WILAYAH}</td>
                  <td>{item.JENIS_PEMBANGKIT}</td>
                  <td>{formatDate(item.date)}</td>

                  {mwData && mwData.length > i && mwData[i] && (
                      Object.keys(mwData[i]).map((value) => (
                        <td key={value}>{mwData[i][value]}</td>
                      ))
                  )}
                
                 
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

export default BebanHarianTable;
