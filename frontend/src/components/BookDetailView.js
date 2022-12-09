import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../auth/AuthTokenContext";

export default function BookDetailsView() {
  const [bookDetails, setBookDetails] = useState(0);
  const params = useParams();
  const bookId = params.bookId;

  useEffect(() => {
    const getBookDetails = async () => {
      const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson) {
        setBookDetails(responseJson);
      }
    };
    getBookDetails();
  }, [bookId]);

  return (
    <>
      {bookDetails && (
        <>
          <h2>The details of book</h2>
          <h3>Title</h3>
          <div>{bookDetails.volumeInfo.title}</div>
          <h3>Subtitle</h3>
          <div>{bookDetails.volumeInfo.subtitle}</div>
          <h3>Description</h3>
          <div>{bookDetails.volumeInfo.description}</div>

          <div class="col-md-12 text-left">
            <button
              type="button"
              class="btn btn-success"
              onClick={() => {
                window.open(
                  `https://vpl.bibliocommons.com/v2/search?query=${bookDetails.volumeInfo.title}`
                );
              }}
            >
              Borrow book
            </button>
          </div>
        </>
      )}
    </>
  );
}
