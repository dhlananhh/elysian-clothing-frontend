"use client";

import {
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Generate sample data for CAC vs LTV analysis
const generateData = () => {
	const data = [];
	for (let i = 0; i < 50; i++) {
		data.push({
			cac: Math.floor(Math.random() * 400) + 100,
			ltv: Math.floor(Math.random() * 4000) + 1000,
			customers: Math.floor(Math.random() * 100) + 10,
		});
	}
	return data;
};

const data = generateData();

export function ScatterPlotDemo() {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<ScatterChart>
				<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
				<XAxis
					type="number"
					dataKey="cac"
					name="CAC"
					unit="$"
					tick={{ fontSize: 12 }}
					tickLine={false}
					label={{ value: "Customer Acquisition Cost ($)", position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					type="number"
					dataKey="ltv"
					name="LTV"
					unit="$"
					tick={{ fontSize: 12 }}
					tickLine={false}
					label={{ value: "Lifetime Value ($)", angle: -90, position: "insideLeft" }}
				/>
				<Tooltip
					cursor={{ strokeDasharray: "3 3" }}
					formatter={(value: ValueType, name: NameType) => {
						const numValue = typeof value === "number" ? value : 0;
						return [`$${numValue}`, name];
					}}
					contentStyle={{
						backgroundColor: "rgba(255, 255, 255, 0.95)",
						border: "1px solid #e0e0e0",
						borderRadius: "4px",
					}}
				/>
				<Legend />
				<Scatter name="Customers" data={data} fill="#8b5cf6" />
			</ScatterChart>
		</ResponsiveContainer>
	);
}
