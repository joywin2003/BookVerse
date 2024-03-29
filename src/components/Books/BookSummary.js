import classes from './BookSummary.module.css'
import HeaderSearch from '../UI/SearchBar/HeaderSearch';

const BookSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Explore and Discover Great Reads Online</h2>
            <p>
                Browse through our diverse collection of books and immerse yourself
                in captivating stories, educational resources, and much more.
            </p>
            <p>
                All our books are carefully curated to provide you with a wide range
                of genres and topics, ensuring you find the perfect book to enrich your
                reading experience.
            </p>
            <div className={classes.search}><HeaderSearch/></div>
        </section>
    );
    
}

export default BookSummary;