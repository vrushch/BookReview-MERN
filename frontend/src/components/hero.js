import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BookList from "./BookList";

export default function Hero() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div className="reviewedBooks">
      <h1 className="mb-4">Reviewed Books</h1>
      <div className="row">
        <BookList />
      </div>
      {/* Here add user reviewd books if user is logged in */}
    </div>
  ) : (
    <div></div>
  );
}
