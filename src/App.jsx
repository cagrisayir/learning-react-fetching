import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { LoadingOverlay } from '@mantine/core';

const App = () => {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('react hooks');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const searchInputRef = useRef(null);

	useEffect(() => {
		getData();
	}, []);

	const handleSearch = (event) => {
		event.preventDefault();
		getData();
	};

	const getData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				`http://hn.algolia.com/api/v1/search?query=${query}`
			);

			setResults(response.data.hits);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	const handleClearSearch = () => {
		setQuery('');
		searchInputRef.current.focus();
	};

	return (
		<div className='flex flex-col gap-4 items-center py-10'>
			<form action='' onSubmit={handleSearch} className='flex gap-10'>
				<input
					type='text'
					ref={searchInputRef}
					className='border text-center '
					onChange={(event) => {
						setQuery(event.target.value);
					}}
					value={query}
				/>
				<button
					type='submit'
					className='border rounded-full px-10 py-4 hover:text-white hover:bg-blue-200 bg-green-200'
				>
					Search
				</button>
				<button
					type='button'
					onClick={handleClearSearch}
					className='border rounded-full px-10 py-4 hover:text-white hover:bg-blue-200 bg-red-200'
				>
					Clear
				</button>
			</form>
			<LoadingOverlay visible={loading} />
			<ul className='flex flex-col gap-2'>
				{results.map((result, idx) => (
					<li key={result.objectID}>
						<a href={result.url}>
							{' '}
							{idx + 1}: {result.title}
						</a>
					</li>
				))}
			</ul>

			{error && <div>{error.message}</div>}
		</div>
	);
};

export default App;
