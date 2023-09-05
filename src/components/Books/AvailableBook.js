import classes from "./AvailableBook.module.css";
import Card from "../UI/Card";
import BookItems from "./BookItems/BookItems";
import { useEffect, useState } from "react";

const AvailableBook = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch('http://127.0.0.1:8000/get_books/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const books = data.books.map(book => {
        const [id, title, author, genre, price] = book;
        return {
          id,
          title,
          author,
          genre,
          price
        };
      });

      console.log(books);
      setAvailableBooks(books);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  },[])
  const BookList = availableBooks.map((book) => (
    <BookItems key={book.id} title = {book.title} author = {book.author} genre = {book.genre} price = {book.price} />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{BookList}</ul>
      </Card>
    </section>
  );
};

export default AvailableBook;
