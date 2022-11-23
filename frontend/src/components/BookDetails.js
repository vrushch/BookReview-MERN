import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState(0);
  const [reviewsDetails, setReviews] = useState(0);
  const [reviewUpdated, setReviewUpdated] = useState(false);
  const params = useParams();
  const bookId = params.bookId;
  console.log("++++++");
  console.log(bookId);

  useEffect(() => {
    const getBookDetails = async () => {
      const url = `https://project-3-backend-fevm.onrender.com/api/books/${bookId}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson) {
        setBookDetails(responseJson);
      }
    };

    getBookDetails();
  }, [bookId]);

  useEffect(() => {
    const getReviewsDetails = async () => {
      const url = `https://project-3-backend-fevm.onrender.com/api/reviews`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson) {
        console.log(responseJson);
        const bookReviews = responseJson.filter((review) => {
          return review.book_id === bookId;
        });
        setReviews(bookReviews);
      }
    };
    getReviewsDetails();
  }, [bookId, reviewUpdated]);

  async function deleteReview(reviewId) {
    const url = `https://project-3-backend-fevm.onrender.com/api/reviews/delete/${reviewId}`;
    const response = await fetch(url, { method: "DELETE" });
    setReviewUpdated(true);
  }

  // async function updateReview(reviewId) {
  //   const url = `https://project-3-backend-fevm.onrender.com/api/reviews/delete/${reviewId}`;
  //   const response = await fetch(url, { method: "DELETE" });
  //   setReviewUpdated(true);
  // }

  return (
    <>
      {bookDetails && reviewsDetails && (
        <>
          <h2>The details of book</h2>
          <h3>Title</h3>
          <div>{bookDetails.volumeInfo.title}</div>
          <h3>Subtitle</h3>
          <div>{bookDetails.volumeInfo.subtitle}</div>
          <h3>Description</h3>
          <div>{bookDetails.volumeInfo.description}</div>
          <h3>Reviews</h3>
          {reviewsDetails.map((review, index) => {
            return (
              <div key={index}>
                {review.review_text}
                <button onClick={() => deleteReview(review._id)}>Delete</button>
                {/* <button onClick={() => updateReview(review._id)}>Update</button> */}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
