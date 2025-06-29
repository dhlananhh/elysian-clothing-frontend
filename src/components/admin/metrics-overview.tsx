"use client";

import { Activity, ArrowDownIcon, ArrowUpIcon, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const metrics = [
	{
		title: "Monthly Recurring Revenue",
		value: "$124,839",
		change: "+12.5%",
		changeType: "positive",
		icon: DollarSign,
		description: "MRR",
	},
	{
		title: "Customer Acquisition Cost",
		value: "$284",
		change: "-8.2%",
		changeType: "positive",
		icon: Users,
		description: "CAC",
	},
	{
		title: "Customer Lifetime Value",
		value: "$3,842",
		change: "+23.1%",
		changeType: "positive",
		icon: TrendingUp,
		description: "LTV",
	},
	{
		title: "Monthly Churn Rate",
		value: "5.2%",
		change: "-0.8%",
		changeType: "positive",
		icon: Activity,
		description: "Churn",
	},
];

export function MetricsOverview() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{metrics.map((metric) => (
				<Card key={metric.title}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
						<metric.icon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{metric.value}</div>
						<div className="flex items-center text-xs text-muted-foreground">
							<span
								className={cn(
									"flex items-center",
									metric.changeType === "positive" ? "text-green-600" : "text-red-600",
								)}
							>
								{metric.changeType === "positive" ? (
									<ArrowUpIcon className="mr-1 h-3 w-3" />
								) : (
									<ArrowDownIcon className="mr-1 h-3 w-3" />
								)}
								{metric.change}
							</span>
							<span className="ml-2">from last month</span>
						</div>
						<div className="mt-1 text-xs text-muted-foreground">{metric.description}</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
