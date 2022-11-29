import React from "react";
import BookList from "./BookList";

const HomeContent = () => (
  <div className="allbooks">
    <h1 className="mb-4">All Books</h1>
    <div className="row">
      <BookList />
    </div>
  </div>
);

export default HomeContent;
