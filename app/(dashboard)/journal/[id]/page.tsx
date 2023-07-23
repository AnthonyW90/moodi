import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { JournalEntry } from '@prisma/client';

const getEntry = async (id: string) => {
	const user = await getUserByClerkId();

	if (!user) return;

	const entry = await prisma.journalEntry.findUnique({
		where: {
			userId_id: {
				userId: user.id,
				id,
			},
		},
	});

	return entry;
};

type Props = {
	params: {
		id: string;
	};
};

const EntryPage = async ({ params }: Props) => {
	const entry = (await getEntry(params.id)) as JournalEntry;

	return (
		<div className="h-full w-full">
			<h1>Entry Page</h1>
			<p>{params.id}</p>
			<Editor entry={entry} />
		</div>
	);
};

export default EntryPage;
