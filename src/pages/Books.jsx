import { useEffect, useState } from "react";
import { fetchBooks } from "../api/booksApi";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        console.log("Books Data:", data); // مقدار دریافتی را بررسی کن

        if (Array.isArray(data.data)) {
          setBooks(data.data); // مقدار صحیح را تنظیم کن
        } else {
          console.error("Books data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Book List</h2>
      {Array.isArray(books) ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
};

export default Books;
