import { JournalEntry } from '@prisma/client';

type Props = {
	entry: JournalEntry;
};

const EntryCard = ({ entry }: Props) => {
	const date = new Date(entry.createdAt).toDateString();
	const color = entry?.analysis?.color || 'gray';
	const mood = entry?.analysis?.mood || 'neutral';
	return (
		<div className="divide-y divide-gray-200 overflow-hidden bg-white shadow">
			<div className="px-4 py-5 sm:p-x-6">{date}</div>
			<div className="px-4 py-5 sm:p-6">
				{entry.analysis?.subject || entry.content}
			</div>
			<div
				className="px-4 py-5 sm:p-x-6 outline"
				style={{ outlineColor: color }}
			>
				{mood}
			</div>
		</div>
	);
};

export default EntryCard;
