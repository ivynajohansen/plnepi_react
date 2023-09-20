import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function TableQuery({ onSearch, onLimitChange }) {
  const [keyword, setKeyword] = useState('');
  const [limit, setLimit] = useState(10);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    setLimit(newLimit);
    onLimitChange(newLimit);
  };

  return (
    <div className="d-flex justify-content-between mt-3">
      <form onSubmit={handleLimitChange}>
        <label htmlFor="limit" className="mr-2">
          Items per page:
        </label>
        <select
          name="limit"
          id="limit"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </form>

      <form onSubmit={handleSearch} id="search_form">
        <input
          type="search"
          id="keyword"
          name="keyword"
          placeholder="Search..."
          className="form-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="sub_btn search-button action-button ml-2">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default TableQuery;
