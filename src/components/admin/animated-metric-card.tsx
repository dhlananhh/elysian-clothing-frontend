"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { animateValue } from "@/lib/realtime-simulator";

interface AnimatedMetricCardProps {
	title: string;
	value: number;
	previousValue?: number;
	format?: (value: number) => string;
	icon: React.ComponentType<{ className?: string }>;
	suffix?: string;
	prefix?: string;
	showTrend?: boolean;
	animate?: boolean;
}

export function AnimatedMetricCard({
	title,
	value,
	previousValue,
	format,
	icon: Icon,
	suffix = "",
	prefix = "",
	showTrend = false,
	animate = true,
}: AnimatedMetricCardProps) {
	const [displayValue, setDisplayValue] = useState(animate ? (previousValue ?? 0) : value);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (!animate) {
			setDisplayValue(value);
			return;
		}

		setIsAnimating(true);
		animateValue(
			displayValue,
			value,
			1000,
			(val) => setDisplayValue(val),
			() => setIsAnimating(false),
		);
	}, [value, animate, displayValue]);

	const formatValue = format || ((v) => Math.round(v).toLocaleString());
	const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;

	const getTrendIcon = () => {
		if (change > 1) return TrendingUp;
		if (change < -1) return TrendingDown;
		return Minus;
	};

	const getTrendColor = () => {
		if (change > 1) return "text-green-500";
		if (change < -1) return "text-red-500";
		return "text-gray-500";
	};

	const TrendIcon = getTrendIcon();

	return (
		<Card className={`card-hover ${isAnimating ? "animate-pulse" : ""}`}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<div className="p-2 rounded-lg bg-primary/10">
					<Icon className="h-4 w-4 text-primary" />
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{prefix}
					{formatValue(displayValue)}
					{suffix}
				</div>
				{showTrend && previousValue !== undefined && (
					<div className={`flex items-center text-xs ${getTrendColor()}`}>
						<TrendIcon className="mr-1 h-3 w-3" />
						{Math.abs(change).toFixed(1)}% {change >= 0 ? "increase" : "decrease"}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
