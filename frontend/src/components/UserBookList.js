import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthToken } from "../auth/AuthTokenContext";

const UserBookList = (props) => {
  const [books, setBooks] = useState([]);
  const history = useHistory();
  const { accessToken } = useAuthToken();

  const getBookRequest = async () => {
    const url =
      "https://project-3-backend-fevm.onrender.com/api/reviews/reviewedbooks";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    });
    const responseJson = await response.json();
    if (responseJson) {
      setBooks(responseJson);
    }
  };
  function navigateToBookDetails(bookid) {
    history.push(`/bookDetails/${bookid}`);
  }
  useEffect(() => {
    getBookRequest();
  }, []);

  return (
    <>
      {books.map((book, index) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={index}
          onClick={() => navigateToBookDetails(book._id)}
        >
          <img src={book.volumeInfo.imageLinks.thumbnail} alt="book"></img>
        </div>
      ))}
    </>
  );
};

export default UserBookList;
