import React, {useState} from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

const HeaderSearch = () => {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const onSelectHandler = (BookTitle) => {
    setInput(BookTitle);
  };
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setBooks={setBooks} input={input} setInput={setInput} />
        <SearchResultsList books={books} onSelectHandler={onSelectHandler} />
      </div>
    </div>
  );
};

export default HeaderSearch;
