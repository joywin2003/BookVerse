import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCart.module.css"
import CartContext from "../../store/cart-context";
import { useContext,useEffect,useState } from "react";

const HeaderCart = (props) => {
    const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
    const value = useContext(CartContext)
    const {items} = value
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber+item.amount;
    },0)
    const btnclass = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;
    useEffect(()=>{
        if(items.length === 0){
            return
        }
       setButtonIsHighlighted(true);
       const timer = setTimeout(()=>{
           setButtonIsHighlighted(false);
       },300)
       return () =>{
           clearTimeout(timer);
       }
    },[items])
    return (
        <>
            <button className={btnclass} onClick={props.showCartHandler}>
                <span className={classes.icon}><CartIcon /></span>
                <span>Your Cart</span>
                <span className={classes.badge}>{numberOfCartItems}</span>
            </button>
        </>
    )
}

export default HeaderCart;