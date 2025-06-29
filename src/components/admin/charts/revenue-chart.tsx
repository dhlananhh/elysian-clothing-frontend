"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

const data = [
	{ month: "Jan", revenue: 85000, projected: 82000 },
	{ month: "Feb", revenue: 92000, projected: 88000 },
	{ month: "Mar", revenue: 98000, projected: 95000 },
	{ month: "Apr", revenue: 103000, projected: 102000 },
	{ month: "May", revenue: 108000, projected: 109000 },
	{ month: "Jun", revenue: 115000, projected: 116000 },
	{ month: "Jul", revenue: 124839, projected: 123000 },
	{ month: "Aug", revenue: null, projected: 130000 },
	{ month: "Sep", revenue: null, projected: 137000 },
];

export function RevenueChart() {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
				<XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
				<YAxis
					tick={{ fontSize: 12 }}
					tickLine={false}
					tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
				/>
				<Tooltip
					formatter={(value: ValueType) => {
						const numValue = typeof value === "number" ? value : null;
						return [`$${numValue?.toLocaleString() || "N/A"}`, ""];
					}}
					labelStyle={{ color: "#666" }}
					contentStyle={{
						backgroundColor: "rgba(255, 255, 255, 0.95)",
						border: "1px solid #e0e0e0",
						borderRadius: "4px",
					}}
				/>
				<Legend verticalAlign="top" height={36} iconType="line" />
				<Line
					type="monotone"
					dataKey="revenue"
					stroke="#3b82f6"
					strokeWidth={2}
					dot={{ fill: "#3b82f6", r: 4 }}
					name="Actual Revenue"
				/>
				<Line
					type="monotone"
					dataKey="projected"
					stroke="#94a3b8"
					strokeWidth={2}
					strokeDasharray="5 5"
					dot={{ fill: "#94a3b8", r: 4 }}
					name="Projected"
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
