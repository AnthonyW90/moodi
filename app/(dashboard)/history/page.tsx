import HistoryChart from '@/components/HistoryChart';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getData = async () => {
	const user = await getUserByClerkId();
	const analyses = await prisma.analysis.findMany({
		where: {
			userId: user.id,
		},
		select: {
			sentimentScore: true,
			mood: true,
			createdAt: true,
			color: true,
		},
		orderBy: {
			createdAt: 'asc',
		},
	});

	const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
	const avg = Math.round(sum / analyses.length);

	return { analyses, avg };
};

const HistoryPage = async () => {
	const { analyses, avg } = await getData();

	return (
		<div className="h-full w-full">
			<h1>History Page</h1>
			<p>Average sentiment score: {avg}</p>
			<div className="h-full w-full flex items-center justify-center">
				<HistoryChart data={analyses} />
			</div>
		</div>
	);
};

export default HistoryPage;
