import React, { useState, useEffect } from "react";
import BookContainer from "../Components/BookContainer";
import { useNavigate } from "react-router-dom";
import "./styles/SearchBooks.css";

function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let latestQuery = query;

    const FetchQuery = setTimeout(async () => {
      setisLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${latestQuery}&limit=10&page`
      );
      const data = await response.json();

      if (latestQuery === query) {
        setBooks(data.docs);
        setisLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(FetchQuery);
      latestQuery = null;
    };
  }, [query]);

  const handleClick = () => {
    navigate("/Bookshelf");
  };

  return (
    <div className="SearchPageContainer">
      <div>
        <h1>Search Page</h1>
        <div>
          <input
            type="text"
            placeholder="Search Books Here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="SearchBar"
          />
        </div>
        <button onClick={handleClick}>BookShelf⏩</button>
      </div>
      <div className="FetchBooksContainer">
        {isLoading ? (
          <div className="LoadingMessage">Loading...</div>
        ) : query.length ? (
          <div className="booksContainer">
            {books.length ? (
              books.map((data) => {
                return <BookContainer book={data} key={data.key} />;
              })
            ) : (
              <div>No Results</div>
            )}
          </div>
        ) : (
          <div className="DefaultText">Get All Books Here🔥</div>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;
