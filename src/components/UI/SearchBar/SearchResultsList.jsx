import React, { useState, useEffect } from "react";
import "./SearchResultsList.css";

const SearchResultsList = ({ books, onSelectHandler, input }) => {
  const [isEmpty, setIsEmpty] = useState(false);
  // Check if books is an array
  useEffect(() => {
    if (input === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [input]);
  if (!Array.isArray(books["books"])) {
    return;
  }
  console.log(books["books"][0][1]);
  return (
    <>
      {!isEmpty && (
        <div className="parent-div">
          <div className="search-results">
            {books["books"].map((book, index) => (
            <div onClick={() => onSelectHandler(book[1])} key={index}>
              {book[1]}
            </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultsList;
