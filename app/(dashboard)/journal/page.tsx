import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';
import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

const getEntries = async () => {
	const user = await getUserByClerkId();
	if (!user) return;
	const entries = await prisma.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			analysis: true,
		},
	});

	return entries;
};

const JournalPage = async () => {
	const entries = await getEntries();
	return (
		<div className="px-10 py-4 bg-zinc-400/10 h-full overflow-scroll">
			<h1 className="text-3xl font-bold mb-8">Journal</h1>
			<div className="mb-6">
				<Question />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<NewEntryCard />
				{entries &&
					entries.map((entry) => (
						<Link href={`/journal/${entry.id}`} key={entry.id}>
							<EntryCard entry={entry} />
						</Link>
					))}
			</div>
		</div>
	);
};

export default JournalPage;
