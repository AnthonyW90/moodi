'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Question = () => {
	const [value, setValue] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [response, setResponse] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		const answer = await askQuestion(value);
		setResponse(answer);
		setValue('');
		setLoading(false);
	};

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					name="question"
					id="question"
					placeholder="Ask a question"
					className="border border-black/20 px-4 py-2 text-lg rounded-lg mr-2"
					onChange={handleChange}
					disabled={isLoading}
				/>
				<button
					disabled={isLoading}
					className="bg-sky-700 px-4 py-2 rounded-lg text-lg tracking-tight text-white"
				>
					Ask
				</button>
			</form>
			{isLoading && <p>Loading...</p>}
			{response && <p>{response}</p>}
		</div>
	);
};

export default Question;
