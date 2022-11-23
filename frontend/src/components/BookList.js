import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const BookList = (props) => {
    const [books, setBooks] = useState([]);

	const getBookRequest = async () => {
    const url = "https://project-3-backend-fevm.onrender.com/api/books";
		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson) {
			setBooks(responseJson);
		}
	};
    
    
	useEffect(() => {
		getBookRequest();
	}, []);


	return (
		<>
			{books.map((book, index) => (
				<div className='image-container d-flex justify-content-start m-3' key={index}>
					<img src={book.volumeInfo.imageLinks.thumbnail} alt='book'></img>
				</div>
			))}
		</>
	);
};

export default BookList;
