import Header from "./components/Layout/Header";
import Books from "./components/Books/Book";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";
import HeaderSearch from "./components/UI/SearchBar/HeaderSearch";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
  }
  return (
    <CartProvider>
   {cartIsShown && <Cart onHideCartHandler={hideCartHandler}/>}
      <Header showCartHandler={showCartHandler} hideCartHandler = {hideCartHandler}/>
      <main>
        <Books />
      </main>
    </CartProvider>
  );
}

export default App;
