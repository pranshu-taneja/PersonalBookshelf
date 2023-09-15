import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookContainer from "../Components/BookContainer";

function Bookshelf() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const fetchData = async (key) => {
    try {
      const response = await fetch(`https://openlibrary.org${key}.json`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const localBooks = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = await fetchData(key);
        localBooks.push(data);
      }

      setBooks(localBooks);
      setLoading(false); // Set loading to false when data is fetched
    };
    fetchBooks();
  }, []);

  return (
    <div className="bookshelfContainer">
      <button
        type="button"
        onClick={() => {
          navigate("/SearchBooks");
        }}
      >
        Search Page⏮️
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {books.length ? (
            <div className="booksContainer">
              {books.map((book) => {
                return <BookContainer key={book.key} book={book} />;
              })}
            </div>
          ) : (
            <div>Nothing Stored on Bookshelf🥲</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;
