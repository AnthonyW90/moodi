'use client';

import { updateEntry } from '@/utils/api';
import { JournalEntry } from '@prisma/client';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

type Props = {
	entry: JournalEntry;
};

const Editor = ({ entry }: Props) => {
	const [value, setValue] = useState(entry.content);
	const [isLoading, setIsLoading] = useState(false);

	useAutosave({
		data: value,
		onSave: async (_value) => {
			if (_value === entry.content) return;
			setIsLoading(true);

			const updatedEntry = await updateEntry(entry.id, _value);

			setIsLoading(false);
		},
		interval: 1000,
	});

	return (
		<div className="w-full h-full">
			{isLoading && <p className="text-center">Saving...</p>}
			<textarea
				className="w-full h-full p-8 text-xl border-0 resize-none focus:outline-none"
				defaultValue={entry.content}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default Editor;
