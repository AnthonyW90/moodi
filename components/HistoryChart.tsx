'use client';

import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	Tooltip,
	YAxis,
} from 'recharts';

const CustomToolTip = ({ payload, label, active }) => {
	if (!active || !payload || !payload.length) return null;

	const dateLabel = new Date(label).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	const analysis = payload[0].payload;

	return (
		<div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
			<div
				className="absolute left-2 top-2 w-2 h-2 rounded-full"
				style={{ background: analysis.color }}
			></div>
			<p className="label text-sm text-black/30">{dateLabel}</p>
			<p className="intro text-xl uppercase">{analysis.mood}</p>
			<p className="score text-4xl">{analysis.sentimentScore}</p>
		</div>
	);
};

const HistoryChart = ({ data }) => {
	return (
		<ResponsiveContainer width={'80%'} height={'80%'}>
			<LineChart width={300} height={100} data={data}>
				<Line
					dataKey="sentimentScore"
					type="monotone"
					stroke="#8884d8"
					strokeWidth={2}
					activeDot={{ r: 8 }}
				/>
				<XAxis dataKey="createdAt" />
				<YAxis dataKey={'sentimentScore'} domain={[-10, 10]} />
				<Tooltip content={<CustomToolTip />} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default HistoryChart;
