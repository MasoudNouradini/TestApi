import { useState, useEffect } from "react";
import axios from "axios";

// تابع fetchBooks برای دریافت کتاب‌ها از API
const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:3010/api/books"); // آدرس API رو اصلاح کن
    return response.data; // داده‌های کتاب‌ها رو برمی‌گردونه
  } catch (error) {
    throw new Error("Failed to fetch books"); // اگر خطایی اتفاق افتاد، ارور رو throw می‌کنه
  }
};

const Books = () => {
  const [books, setBooks] = useState([]); // state برای ذخیره‌ی کتاب‌ها
  const [isLoading, setIsLoading] = useState(false); // state برای وضعیت loading
  const [error, setError] = useState(null); // state برای ذخیره‌ی خطا

  // useEffect برای fetch کتاب‌ها وقتی کامپوننت mount می‌شه
  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true); // شروع loading
      setError(null); // reset خطا
      try {
        const data = await fetchBooks(); // fetch کتاب‌ها
        setBooks(data.data); // آپدیت state کتاب‌ها
      } catch (err) {
        setError(err.message); // اگر خطایی اتفاق افتاد، state خطا رو آپدیت کن
      } finally {
        setIsLoading(false); // پایان loading
      }
    };

    getBooks(); // فراخوانی تابع fetch کتاب‌ها
  }, []); // آرایه‌ی وابستگی خالیه، یعنی فقط یک بار اجرا می‌شه

  // Conditional rendering برای نمایش وضعیت‌های مختلف
  if (isLoading) {
    return <p>Loading books...</p>; // نمایش پیام loading
  }

  if (error) {
    return <p>Error: {error}</p>; // نمایش پیام خطا
  }

  // نمایش لیست کتاب‌ها
  return (
    <div>
      <h1>Books List</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found.</p> // اگر کتابی وجود نداشت، این پیام نمایش داده می‌شه
      )}
    </div>
  );
};

export default Books;
