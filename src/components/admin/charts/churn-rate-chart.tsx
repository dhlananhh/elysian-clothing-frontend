"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

const data = [
	{ month: "Jan", rate: 6.8 },
	{ month: "Feb", rate: 6.2 },
	{ month: "Mar", rate: 5.9 },
	{ month: "Apr", rate: 6.1 },
	{ month: "May", rate: 5.6 },
	{ month: "Jun", rate: 5.4 },
	{ month: "Jul", rate: 5.2 },
];

export function ChurnRateChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<AreaChart data={data}>
				<defs>
					<linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
				<XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
				<YAxis tick={{ fontSize: 12 }} tickLine={false} tickFormatter={(value) => `${value}%`} />
				<Tooltip
					formatter={(value: ValueType) => {
						const numValue = typeof value === "number" ? value : 0;
						return [`${numValue}%`, "Churn Rate"];
					}}
					contentStyle={{
						backgroundColor: "rgba(255, 255, 255, 0.95)",
						border: "1px solid #e0e0e0",
						borderRadius: "4px",
					}}
				/>
				<Area type="monotone" dataKey="rate" stroke="#f59e0b" fillOpacity={1} fill="url(#colorChurn)" />
			</AreaChart>
		</ResponsiveContainer>
	);
}
