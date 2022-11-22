import React from 'react';

const BookList = (props) => {
	return (
		<>
			{props.books.map((book, index) => (

				<div className='image-container d-flex justify-content-start m-3'>
					<img src={book.volumeInfo.imageLinks.thumbnail} alt='movie'></img>
				</div>
			))}
		</>
	);
};

export default BookList;
