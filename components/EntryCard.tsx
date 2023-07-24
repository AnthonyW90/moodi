import { JournalEntry } from '@prisma/client';

type Props = {
	entry: JournalEntry;
};

const EntryCard = ({ entry }: Props) => {
	const date = new Date(entry.createdAt).toDateString();
	return (
		<div className="divide-y divide-gray-200 overflow-hidden bg-white shadow">
			<div className="px-4 py-5 sm:p-x-6">{date}</div>
			<div className="px-4 py-5 sm:p-6">{entry.content}</div>
			<div className="px-4 py-5 sm:p-x-6">mood</div>
		</div>
	);
};

export default EntryCard;
