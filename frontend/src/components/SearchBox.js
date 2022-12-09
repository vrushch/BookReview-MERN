import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const SearchBox = (props) => {
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [searchNumber, setSearchNumber] = useState(1);
  const history = useHistory();

  const getBookRequest = async (searchValue) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setBooks(responseJson.items);
    }
    console.log(books);
  };
  function navigateToBookDetails(bookid) {
    console.log(bookid);
    history.push(`/bookDetailsView/${bookid}`);
  }
  useEffect(() => {
    getBookRequest(searchValue);
  }, [searchNumber]);

  return (
    <>
      <div className="col col-sm-4">
        <input
          className="form-control"
          value={props.value}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Enter Book Name Here"
        ></input>
        <ButtonGroup className="mb-2">
          <Button onClick={() => setSearchNumber(searchNumber + 1)}>
            Search
          </Button>
        </ButtonGroup>
      </div>

      <div className="row">
        {books.map((book, index) => (
          <div
            className="image-container d-flex justify-content-start m-3"
            key={index}
            onClick={() => navigateToBookDetails(book.id)}
          >
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book"></img>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBox;
