import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 250);

    return () => clearTimeout(timeoutRef.current);
  }, [value, onSearch]);

  return (
    <div className="search-bar">
      <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
      />
      {value && (
        <button className="clear-button" onClick={() => setValue('')}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
