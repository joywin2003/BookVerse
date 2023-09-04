import classes from "./AvailableBook.module.css";
import Card from "../UI/Card";
import BookItems from "./BookItems/BookItems";
const DUMMY_MEALS = [
  {
    id: "b1",
    title: "The Great Gatsby",
    description: "A classic novel by F. Scott Fitzgerald",
    price: 10.99,
  },
  {
    id: "b2",
    title: "To Kill a Mockingbird",
    description: "A Pulitzer Prize-winning novel by Harper Lee",
    price: 12.5,
  },
  {
    id: "b3",
    title: "1984",
    description: "A dystopian novel by George Orwell",
    price: 8.99,
  },
  {
    id: "b4",
    title: "Pride and Prejudice",
    description: "A beloved novel by Jane Austen",
    price: 14.99,
  },
];

const AvailableBook = () => {
  const MealList = DUMMY_MEALS.map((book) => (
    <BookItems key={book.id} id={book.id} book={book} />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{MealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableBook;
