import { useReducer, useState, useEffect } from "react";

import CartContext from "./cart-context";
import { act } from "react-dom/test-utils";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};



const addCartHandler = async (cartitem) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/add_cart/",
      {
        method: "POST",
        body: JSON.stringify(cartitem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error adding item to cart.");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const  deleteCartHandler = async(cartItemId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/delete_cart/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error deleting item from cart.");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};


const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log("bingo");
    console.log(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };


      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      addCartHandler(updatedItem);
    } else {
      updatedItems = state.items.concat(action.item);
      addCartHandler(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    deleteCartHandler(action.id);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get_cartitems/");
      if (!response.ok) {
        throw new Error("Something went wrong while fetching cart items!");
      }
      const data = await response.json();
      console.log(data);
  
      if (data.cartitems && Array.isArray(data.cartitems)) {
        const cartItems = data.cartitems.map((cartItem) => {
          const id = cartItem[0];
          const title = cartItem[1];
          const price = cartItem[2];
          const amount = cartItem[3];
          return {
            id,
            title,
            price,
            amount,
          };
        });
        for (const cartItem of cartItems) {
          if(cartItem.amount!=0)
            dispatchCartAction({ type: 'ADD', item: cartItem });
        }
      } else {
        console.error("No cart items found in the response.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchCartItems();
  }, []);
  

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    availableBooks: availableBooks,
    setAvailableBooks: setAvailableBooks,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
