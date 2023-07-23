import NewEntryCard from '@/components/NewEntryCard';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

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
	});

	return entries;
};

const JournalPage = async () => {
	const entries = await getEntries();
	console.log('entries', entries);
	return (
		<div className="px-10 py-4 bg-zinc-400/10 h-full">
			<h1 className="text-3xl font-bold mb-8">Journal</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<NewEntryCard />
				{entries &&
					entries.map((entry) => <div key={entry.id}>{entry.id}</div>)}
			</div>
		</div>
	);
};

export default JournalPage;
