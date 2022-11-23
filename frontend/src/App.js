import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BookList from "./components/BookList";
import Heading from "./components/Heading";
import SearchBox from "./components/SearchBox";
import { Link, Route, Routes } from "react-router-dom";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="container-fluid book-app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="row d-flex align-items-center mt-4 mb-4">
                <Heading heading="Books" />
              </div>
              <div className="row">
                <BookList />
              </div>
            </>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          }
        ></Route>
        {/* <Route path="/tasks/:taskId" element={<TaskDetails />} /> */}
        <Route path="*" element={<p>Nothing to match this path. </p>} />
      </Routes>

      {/*  
      			<div className='row d-flex align-items-center mt-4 mb-4'>
				<Heading heading='Reviewed Books' />
			</div>
			<div className='row'>
				<BookList
					books={books}
				/>
			</div>
      */}
    </div>
  );
};

export default App;
