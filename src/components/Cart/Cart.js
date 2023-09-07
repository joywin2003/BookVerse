import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const hasItems = cartCtx.items.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const makeOrderHandler = async () => {
    try {

      const response = await fetch("http://127.0.0.1:8000/add_order/", {
        method: "POST"
      });
      console.log(response.text());
      if (!response.ok) {
        alert("Order could not be placed.");
      } else {
        alert("Order placed successfully.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={classes.cart}>
      <Modal onClose={props.onHideCartHandler}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={props.onHideCartHandler}
            className={classes["button--alt"]}
          >
            Close
          </button>
          {hasItems && (
            <button
              onClick={makeOrderHandler.bind(null, totalAmount)}
              className={classes.button}
            >
              Order
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
