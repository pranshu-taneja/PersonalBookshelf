import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookshelf from "./Pages/BookShelf";
import SearchBooks from "./Pages/SearchBooks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Bookshelf" exact element={<Bookshelf />}></Route>
          <Route path="/SearchBooks" exact element={<SearchBooks />}></Route>
          <Route path="/" exact element={<SearchBooks />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
