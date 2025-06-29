"use client";

import { LucideIcon } from "lucide-react";
import CountUp from "react-countup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedMetricCardProps {
	title: string;
	value: number;
	previousValue?: number;
	icon: LucideIcon;
	format?: (value: number) => string;
	animate?: boolean;
	showTrend?: boolean;
}

export function AnimatedMetricCard({
	title,
	value,
	previousValue = 0,
	icon: Icon,
	format,
	animate = true,
	showTrend = false,
}: AnimatedMetricCardProps) {
	const percentageChange = previousValue === 0 ? 0 : ((value - previousValue) / previousValue) * 100;

	const formattedValue = format ? format(value) : value.toString();

	return (
		<Card
			className={cn(
				"h-full",
				"transition-all duration-300 ease-in-out",
				"hover:scale-[1.02]",
				"hover:shadow-xl",
				"dark:hover:shadow-blue-500/20",
			)}
		>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="h-5 w-5 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{animate ? (
						<CountUp
							start={0}
							end={value}
							duration={2}
							separator=","
							formattingFn={format ? (val) => format(val) : undefined}
						/>
					) : (
						formattedValue
					)}
				</div>
				{showTrend && (
					<p
						className={cn(
							"text-xs text-muted-foreground mt-1",
							percentageChange > 0 && "text-green-600",
							percentageChange < 0 && "text-red-600",
						)}
					>
						{percentageChange.toFixed(1)}% {percentageChange > 0 ? "increase" : "decrease"}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
