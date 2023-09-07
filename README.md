# BookVerse

**BookVerse** is a web application built using React, FastAPI, and MySQL that allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of books. It provides a user-friendly interface for managing book data.

## Features

- **Browse Books**: View a list of available books with details like title, author, genre, and price.
- **Search Books**: Search for books by title, author, or genre.
- **Add to Cart**: Add books to a shopping cart for later purchase.
- **Remove from Cart**: Remove books from the shopping cart.
- **Place Orders**: Place orders for the items in the shopping cart.
- **User Authentication**: Secure user authentication and authorization for managing book data.
- **Responsive Design**: User-friendly interface accessible on both desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Python](https://www.python.org/) and [FastAPI](https://fastapi.tiangolo.com/) for the backend.
- [MySQL](https://www.mysql.com/) database server.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/bookverse.git
   cd bookverse

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Configure the database connection in the backend. Update the `config.py` file with your MySQL database credentials.

5. Initialize the database:

   ```bash
   python database.py
   ```

### Usage

1. Start the FastAPI backend:

   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the React frontend:

   ```bash
   npm start
   ```

3. Open your web browser and access the BookVerse application at `http://localhost:3000`.

## API Endpoints

The BookVerse API provides the following endpoints:

- `GET /books`: Get a list of all books.
- `GET /books/{book_id}`: Get details of a specific book.
- `POST /books`: Add a new book to the collection.
- `PUT /books/{book_id}`: Update the details of a specific book.
- `DELETE /books/{book_id}`: Delete a book from the collection.
- `GET /search?q={query}`: Search for books by title, author, or genre.
- `POST /add_cart`: Add a book to the shopping cart.
- `DELETE /remove_cart/{book_id}`: Remove a book from the shopping cart.
- `GET /get_cartitems`: Get the items in the shopping cart.
- `POST /make_order`: Place an order for the items in the shopping cart.

## Contributing

Contributions are welcome! If you'd like to contribute to BookVerse, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
