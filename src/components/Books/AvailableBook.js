import classes from "./AvailableBook.module.css";
import Card from "../UI/Card";
import BookItems from "./BookItems/BookItems";
import CartContext from "../../store/cart-context";
import { useEffect, useState, useContext } from "react";
import Button from "../UI/Button/Button";

const AvailableBook = () => {
  // const [availableBooks, setAvailableBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const value = useContext(CartContext);
  const { availableBooks, setAvailableBooks } = value;
  const fetchBooks = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch("http://127.0.0.1:8000/get_books/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const books = data.books.map((book) => {
        const [id, title, author, genre, price] = book;
        return {
          id,
          title,
          author,
          genre,
          price,
        };
      });
      setAvailableBooks(books);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const BookList = availableBooks.map((book) => (
    <BookItems
      key={book.id}
      id={book.id}
      title={book.title}
      author={book.author}
      genre={book.genre}
      price={book.price}
    />
  ));

  let content = <p>Found no Books.</p>;
  if (availableBooks.length > 0) {
    content = <ul>{BookList}</ul>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <h3>{isError}</h3>;
  }
  return (
    <section className={classes.meals}>
      <Card>
        <div className={classes.buttonContainer}>
          <Button className={classes.refresh} onClick={fetchBooks}>
            Refresh
          </Button>
        </div>
        {content}
      </Card>
    </section>
  );
};

export default AvailableBook;
