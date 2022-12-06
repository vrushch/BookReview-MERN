import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../auth/AuthTokenContext";

export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState(0);
  const [reviewsDetails, setReviews] = useState(0);
  const [viewAllReviews, setAllReview] = useState(0);
  const [reviewUpdated, setReviewUpdated] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [editReview, setEditReview] = useState(false);
  const [editReviewText, setEditReviewText] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const params = useParams();
  const bookId = params.bookId;
  console.log("++++++");
  console.log(bookId);
  const { accessToken } = useAuthToken();

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
      //const url = `https://project-3-backend-fevm.onrender.com/api/reviews`;
      const url = `https://project-3-backend-fevm.onrender.com/api/reviews/bookuser`;
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
        console.log(responseJson);
        const bookReviews = responseJson.filter((review) => {
          return review.book_id === bookId;
        });
        setReviews(bookReviews);
      }
    };
    getReviewsDetails();
  }, [bookId, reviewUpdated]);

  useEffect(() => {
    const getAllReviewsDetails = async () => {
      const url = `https://project-3-backend-fevm.onrender.com/api/reviews`;
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
        console.log(responseJson);
        const bookReviews = responseJson.filter((review) => {
          return review.book_id === bookId;
        });
        setAllReview(bookReviews);
      }
    };
    getAllReviewsDetails();
  }, [bookId, reviewUpdated]);

  async function deleteReview(reviewId) {
    const url = `https://project-3-backend-fevm.onrender.com/api/reviews/delete/${reviewId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    });
    setReviewUpdated(!reviewUpdated);
  }

  async function saveReview(reviewId, review_text) {
    const reqBody = {
      _id: reviewId,
      review_text: review_text,
    };

    const url = `https://project-3-backend-fevm.onrender.com/api/reviews/edit`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    setEditReview(false);
    setReviewUpdated(!reviewUpdated);
    setEditReviewText("");
  }

  async function createReview(review_text) {
    const reqBody = {
      book_id: bookId,
      review_text: review_text,
    };

    const url = `https://project-3-backend-fevm.onrender.com/api/reviews/add`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    setEditReview(false);
    setEditReviewText("");
    setReviewUpdated(!reviewUpdated);
    setAddReview(false);
  }

  return (
    <>
      {bookDetails && reviewsDetails && viewAllReviews && (
        <>
          <h2>The details of book</h2>
          <h3>Title</h3>
          <div>{bookDetails.volumeInfo.title}</div>
          <div class="col-md-12 bg-light text-right">
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
          <h3>Subtitle</h3>
          <div>{bookDetails.volumeInfo.subtitle}</div>
          <h3>Description</h3>
          <div>{bookDetails.volumeInfo.description}</div>
          <h3>Reviews</h3>
          {!editReview && (
            <button
              onClick={() => {
                setAddReview(true);
                setEditReview(true);
              }}
            >
              Add New Review{" "}
            </button>
          )}
          {!editReview ? (
            reviewsDetails.map((review, index) => {
              return (
                <div key={index}>
                  {review.review_text}
                  <button onClick={() => deleteReview(review._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditReview(true);
                      setEditIndex(index);
                    }}
                  >
                    Update
                  </button>
                </div>
              );
            })
          ) : (
            <div>
              <input
                placeholder="Enter New Review"
                value={editReviewText}
                onChange={(e) => setEditReviewText(e.target.value)}
              />
              {addReview ? (
                <button
                  onClick={() => {
                    createReview(editReviewText);
                  }}
                >
                  Create{" "}
                </button>
              ) : (
                <button
                  onClick={() =>
                    saveReview(reviewsDetails[editIndex]._id, editReviewText)
                  }
                >
                  Save
                </button>
              )}
            </div>
          )}
          {viewAllReviews.map((review, index) => {
            return <div key={index}>{review.review_text}</div>;
          })}
        </>
      )}
    </>
  );
}
