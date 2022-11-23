import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState([]);
  const params = useParams();
  const bookId = params.bookId;
  console.log("++++++");
  console.log(bookId);
  const getBookDetails = async () => {
    const url = `https://project-3-backend-fevm.onrender.com/api/books/${bookId}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setBookDetails(responseJson);
    }
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  return <div>{bookDetails.kind}</div>;
}
