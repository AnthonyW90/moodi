import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { Analysis, JournalEntry, User } from '@prisma/client';

type JournalEntryWithAnalysis = JournalEntry & {
	analysis: Analysis;
};

const getEntry = async (id: string) => {
	const user = (await getUserByClerkId()) as User;

	const entry = await prisma.journalEntry.findUnique({
		where: {
			userId_id: {
				userId: user.id,
				id,
			},
		},
		include: {
			analysis: true,
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
	const entry = (await getEntry(params.id)) as JournalEntryWithAnalysis;

	return (
		<div className="h-full w-full">
			<Editor entry={entry} />
		</div>
	);
};

export default EntryPage;
