'use client';

import { deleteEntry, updateEntry } from '@/utils/api';
import { JournalEntry } from '@prisma/client';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { useRouter } from 'next/navigation';

type Props = {
	entry: JournalEntry;
};

const blankAnalysis = {
	mood: '',
	intensity: '',
	negative: false,
	summary: '',
	subject: '',
	color: '',
};

const Editor = ({ entry }: Props) => {
	const [value, setValue] = useState(entry.content);
	const [isLoading, setIsLoading] = useState(false);
	const [analysis, setAnalysis] = useState(entry.analysis || blankAnalysis);
	const router = useRouter();

	// useAutosave({
	// 	data: value,
	// 	onSave: async (_value) => {
	// 		if (_value === entry.content) return;
	// 		setIsLoading(true);

	// 		const updatedEntry = await updateEntry(entry.id, _value);

	// 		setAnalysis(updatedEntry.analysis);
	// 		setIsLoading(false);
	// 	},
	// 	interval: 1000,
	// });

	const handleSave = async () => {
		if (value === entry.content) return;
		setIsLoading(true);

		const updatedEntry = await updateEntry(entry.id, value);

		setAnalysis(updatedEntry.analysis);

		setIsLoading(false);
	};

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this entry?')) return;

		await deleteEntry(entry.id);

		router.push('/journal');
	};

	const { mood, intensity, negative, summary, subject, color } = analysis;

	const analysisData = [
		{ name: 'Summary', value: summary },
		{ name: 'Subject', value: subject },
		{ name: 'Mood', value: mood },
		{ name: 'Intensity', value: intensity },
		{ name: 'Negative', value: negative ? 'True' : 'False' },
	];

	return (
		<div className="w-full h-full grid sm:grid-cols-3">
			<div className="h-[80vh] sm:col-span-2 flex flex-col">
				{isLoading && <p className="text-center flex">Saving...</p>}
				<textarea
					className="w-full h-full p-8 text-xl border-0 resize-none focus:outline-none flex-1"
					defaultValue={entry.content}
					onChange={(e) => setValue(e.target.value)}
					disabled={isLoading}
				/>
				<div className="self-end m-4 flex gap-2">
					<button
						className="bg-blue-500 text-lg text-white px-4 py-2 rounded-xl"
						disabled={isLoading}
						onClick={handleSave}
					>
						Save
					</button>
					<button
						className="outline outline-red-500 text-red-500 px-4 py-2 rounded-xl"
						onClick={handleDelete}
					>
						Delete
					</button>
				</div>
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
