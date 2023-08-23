import BookImage from '../../assets/book1.jpeg'
import classes from './Header.module.css' 
import HeaderCart from './HeaderCart';

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>BookHaven</h1>
                <HeaderCart showCartHandler={props.showCartHandler} hideCartHandler = {props.hideCartHandler}/>
            </header>
            <div className={classes['main-image']}>
                <img src={BookImage} alt="meals image" />
            </div>
        </>
    );
}

export default Header;