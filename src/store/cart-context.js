import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  availableBooks: [],
  setcontent: (value) => {},
  addItems: (item) => {},
  removeItem: (id) => {},
  setAvailableBooks:(value) => {},
});

export default CartContext;