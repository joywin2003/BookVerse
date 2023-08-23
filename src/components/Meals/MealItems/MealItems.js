import classes from "./MealItems.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";
const MealItems = (props) => {
  const price = `$${props.book.price.toFixed(2)}`;
  const cartctx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartctx.addItems({
      id: props.book.id,
      name: props.book.title,
      amount: amount,
      price: props.book.price
    })
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.book.title}</h3>
        <div className={classes.description}>{props.book.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div><MealItemForm onAddToCart= {addToCartHandler}/></div>
    </li>
  );
  
};

export default MealItems;



