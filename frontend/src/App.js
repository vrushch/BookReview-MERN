import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookList from './components/BookList';
import Heading from './components/Heading';
import SearchBox from './components/SearchBox';

const App = () => {
	const [books, setBooks] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getBookRequest = async (searchValue) => {
    const url = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
    //const url = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`;
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.items) {
			setBooks(responseJson.items);
		}
	};

	useEffect(() => {
		getBookRequest(searchValue);
	}, [searchValue]);


	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<Heading heading='Books' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<BookList
					books={books}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<Heading heading='Reviewed Books' />
			</div>
			<div className='row'>
				<BookList
					books={books}
				/>
			</div>
		</div>
	);
};

export default App;