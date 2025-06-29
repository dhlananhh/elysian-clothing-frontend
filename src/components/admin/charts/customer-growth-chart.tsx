"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
	{ month: "Jan", new: 145, churned: 32 },
	{ month: "Feb", new: 168, churned: 28 },
	{ month: "Mar", new: 192, churned: 35 },
	{ month: "Apr", new: 210, churned: 42 },
	{ month: "May", new: 185, churned: 38 },
	{ month: "Jun", new: 224, churned: 45 },
	{ month: "Jul", new: 248, churned: 52 },
];

export function CustomerGrowthChart() {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
				<XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
				<YAxis tick={{ fontSize: 12 }} tickLine={false} />
				<Tooltip
					contentStyle={{
						backgroundColor: "rgba(255, 255, 255, 0.95)",
						border: "1px solid #e0e0e0",
						borderRadius: "4px",
					}}
				/>
				<Legend verticalAlign="top" height={36} />
				<Bar dataKey="new" fill="#10b981" name="New Customers" radius={[4, 4, 0, 0]} />
				<Bar dataKey="churned" fill="#ef4444" name="Churned" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
