import React, { useState, useContext } from "react";
import "./SearchResultsList.css";

const SearchResultsList = ({ books, onSelectHandler }) => {
  const [isempty, SetIsEmpty] = useState(true);
  // Check if books is an array
  if (!Array.isArray(books["books"])) {
    return;
  }
  console.log(books["books"][0][1]);
  return (
    <div className="parent-div">
      <div className="search-results">
        {books["books"].map((book, index) => (
          <div onClick={() => onSelectHandler(book[1])} key={index}>
            {book[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsList;
