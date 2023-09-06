import React, { useState, useContext } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import CartContext from "../../../store/cart-context";

const HeaderSearch = () => {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const value = useContext(CartContext);
  const { availableBooks, setAvailableBooks } = value;
  const onSelectHandler = (BookTitle) => {
    setInput(BookTitle);
  };
  const onSearchHandler = (enteredValue) => {
    try {
      const filteredBooks = books["books"].filter((book) => {
        const [id, title, author, genre, price] = book;
        return title.toLowerCase().includes(enteredValue.toLowerCase());
      });
  
      const filteredBooksWithStructure = filteredBooks.map((book) => {
        const [id, title, author, genre, price] = book;
        return {
          id,
          title,
          author,
          genre,
          price,
        };
      });
  
      setAvailableBooks(filteredBooksWithStructure);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar
          setBooks={setBooks}
          input={input}
          setInput={setInput}
          onSearchHandler={onSearchHandler}
        />
        <SearchResultsList
          input={input}
          books={books}
          onSelectHandler={onSelectHandler}
          onSearchHandler={onSearchHandler}
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
