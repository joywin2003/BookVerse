import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = ({ setBooks, input, setInput, onSearchHandler }) => {
  const fetchbooks = async (value) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search_book/${value}`
      );
      if (!response) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setBooks(data);
    } catch (e) {
      console.log(e);
    }
  };
  const handlefetch = (value) => {
    setInput(value);
    if (value) {
      fetchbooks(value);
    }
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search"
        value={input}
        onChange={(e) => handlefetch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearchHandler(); // Call the onSearchHandler function when Enter is pressed
          }
        }}
      ></input>
    </div>
  );
};

export default SearchBar;
