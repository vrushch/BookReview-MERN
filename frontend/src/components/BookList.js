import React from 'react';

const BookList = (props) => {
	return (
		<>
			{props.books.map((book, index) => (
				<div className='image-container d-flex justify-content-start m-3' key={index}>
					<img src={book.volumeInfo.imageLinks.thumbnail} alt='book'></img>
				</div>
			))}
		</>
	);
};

export default BookList;
