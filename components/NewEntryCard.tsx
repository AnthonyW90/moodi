'use client';

import { useRouter } from 'next/navigation';
import { createJournalEntry } from '@/utils/api';

const NewEntryCard = () => {
	const router = useRouter();

	const handleClick = async () => {
		const { data } = await createJournalEntry();
		router.push(`/journal/${data.id}}`);
	};

	return (
		<div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
			<div className="px-4 py-5 sm:p-6" onClick={handleClick}>
				<span
					className="text-3xl"
					dangerouslySetInnerHTML={{ __html: 'New Entry &plus;' }}
				></span>
			</div>
		</div>
	);
};

export default NewEntryCard;
