"use client";

import {
	Area,
	Bar,
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const data = [
	{ month: "Jan", revenue: 85000, expenses: 45000, profit: 40000, margin: 47 },
	{ month: "Feb", revenue: 92000, expenses: 48000, profit: 44000, margin: 48 },
	{ month: "Mar", revenue: 98000, expenses: 52000, profit: 46000, margin: 47 },
	{ month: "Apr", revenue: 103000, expenses: 55000, profit: 48000, margin: 47 },
	{ month: "May", revenue: 108000, expenses: 58000, profit: 50000, margin: 46 },
	{ month: "Jun", revenue: 115000, expenses: 62000, profit: 53000, margin: 46 },
	{ month: "Jul", revenue: 124839, expenses: 68000, profit: 56839, margin: 46 },
];

export function ComposedChartDemo() {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<ComposedChart data={data}>
				<defs>
					<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
				<XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
				<YAxis
					yAxisId="left"
					tick={{ fontSize: 12 }}
					tickLine={false}
					tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
				/>
				<YAxis
					yAxisId="right"
					orientation="right"
					tick={{ fontSize: 12 }}
					tickLine={false}
					tickFormatter={(value) => `${value}%`}
				/>
				<Tooltip
					formatter={(value: ValueType, name: NameType) => {
						const numValue = typeof value === "number" ? value : 0;
						if (name === "Margin") return [`${numValue}%`, name];
						return [`$${numValue.toLocaleString()}`, name];
					}}
					contentStyle={{
						backgroundColor: "rgba(255, 255, 255, 0.95)",
						border: "1px solid #e0e0e0",
						borderRadius: "4px",
					}}
				/>
				<Legend />
				<Area
					yAxisId="left"
					type="monotone"
					dataKey="revenue"
					fill="url(#colorRevenue)"
					stroke="#3b82f6"
					name="Revenue"
				/>
				<Bar yAxisId="left" dataKey="expenses" fill="#ef4444" name="Expenses" />
				<Line
					yAxisId="right"
					type="monotone"
					dataKey="margin"
					stroke="#10b981"
					strokeWidth={2}
					name="Margin"
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
}
