"use client";

import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ metric: "Revenue Growth", current: 85, target: 90 },
	{ metric: "Customer Satisfaction", current: 92, target: 95 },
	{ metric: "Market Share", current: 78, target: 85 },
	{ metric: "Product Quality", current: 88, target: 90 },
	{ metric: "Team Performance", current: 82, target: 88 },
	{ metric: "Innovation", current: 75, target: 85 },
];

export function RadarChartDemo() {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<RadarChart data={data}>
				<PolarGrid stroke="#e0e0e0" />
				<PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
				<PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
				<Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
				<Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
				<Legend />
			</RadarChart>
		</ResponsiveContainer>
	);
}
