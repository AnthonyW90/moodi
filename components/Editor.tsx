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
	const [analysis, setAnalysis] = useState(entry.analysis);

	useAutosave({
		data: value,
		onSave: async (_value) => {
			if (_value === entry.content) return;
			setIsLoading(true);

			const updatedEntry = await updateEntry(entry.id, _value);

			setAnalysis(updatedEntry.analysis);
			setIsLoading(false);
		},
		interval: 1000,
	});

	const { mood, intensity, negative, summary, subject, color } = analysis;

	const analysisData = [
		{ name: 'Summary', value: summary },
		{ name: 'Subject', value: subject },
		{ name: 'Mood', value: mood },
		{ name: 'Intensity', value: intensity },
		{ name: 'Negative', value: negative ? 'True' : 'False' },
	];

	return (
		<div className="w-full h-full grid grid-cols-3">
			{isLoading && <p className="text-center">Saving...</p>}
			<div className="col-span-2">
				<textarea
					className="w-full h-full p-8 text-xl border-0 resize-none focus:outline-none"
					defaultValue={entry.content}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
			<div className="border-l border-black/10">
				<div className="px-6 py-10" style={{ background: color }}>
					<h2 className="text-2xl">Analysis</h2>
				</div>
				<div>
					<ul>
						{analysisData.map((data) => (
							<li
								key={data.name}
								className="flex px-2 py-4 border-t border-b border-black/10 items-center justify-between"
							>
								<span className="text-lg font-semibold">{data.name}</span>
								<span>{data.value}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Editor;
