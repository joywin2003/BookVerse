import classes from "./BookItems.module.css";
import BookItemForm from "./BookItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const BookItems = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartctx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    // cartctx.addItems({
    //   id: props.book.id,
    //   name: props.book.title,
    //   amount: amount,
    //   price: props.book.price
    // })
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.title}</h3>
        <div className={classes.description}>{props.author}</div>
        <div className={classes.description}>{props.genre}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      <div><BookItemForm onAddToCart= {addToCartHandler}/></div>
    </li>
  );
  
};

export default BookItems;



