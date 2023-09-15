import React, { useState, useEffect } from "react";
import "./styles/BookContainer.css";

function BookContainer({ book }) {
  const [isBookSaved, setIsBookSaved] = useState(checkIsSaved());
  const URL = `https://openlibrary.org${book.key}`;

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function checkIsSaved() {
    return localStorage.getItem(book.key) ? true : false;
  }

  function handleStorageChange(event) {
    if (event.key === book.key) {
      setIsBookSaved(event.newValue ? true : false);
    }
  }

  const title = book.title;

  const handleToggle = () => {
    if (isBookSaved) {
      localStorage.removeItem(book.key);
    } else {
      localStorage.setItem(book.key, title);
    }
    setIsBookSaved(!isBookSaved);
  };

  return (
    <div className="bookContainer">
      <div className="content">
        <a href={URL} target="_blank">
          <p className="bookTitle">
            {title.length > 25 ? <p>{title.slice(0, 25)}...</p> : <p>{title}</p>}
          </p>
        </a>
      </div>
      <div className="buttonContainer">
        <button onClick={handleToggle}>
          {isBookSaved ? "Remove From Bookshelf" : "Add to Bookshelf"}
        </button>
      </div>
    </div>
  );
}

export default BookContainer;
