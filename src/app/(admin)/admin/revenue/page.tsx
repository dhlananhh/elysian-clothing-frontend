"use client";

import { eachDayOfInterval, format, subDays } from "date-fns";
import { useEffect } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { useEcommerceStore } from "@/store/ecommerce-store";

export default function RevenuePage() {
	const { metrics, orders, initializeData } = useEcommerceStore();

	useEffect(() => {
		if (!metrics) {
			initializeData();
		}
	}, [metrics, initializeData]);

	if (!metrics) {
		return (
			<div className="flex items-center justify-center h-96">
				<p className="text-muted-foreground">Loading revenue data...</p>
			</div>
		);
	}

	// Calculate revenue by channel
	const revenueByChannel = orders
		.filter((o) => o.createdAt >= subDays(new Date(), 30))
		.reduce(
			(acc, order) => {
				acc[order.channel] = (acc[order.channel] || 0) + order.total;
				return acc;
			},
			{} as Record<string, number>,
		);

	const channelData = Object.entries(revenueByChannel).map(([channel, revenue]) => ({
		channel: channel.charAt(0).toUpperCase() + channel.slice(1),
		revenue,
	}));

	// Calculate daily revenue for comparison
	const last30Days = eachDayOfInterval({
		start: subDays(new Date(), 29),
		end: new Date(),
	});

	const dailyRevenue = last30Days.map((date) => {
		const dayOrders = orders.filter((o) => format(o.createdAt, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
		return {
			date: format(date, "MMM dd"),
			revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
		};
	});

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
				<p className="text-muted-foreground">Detailed revenue breakdowns and trends</p>
			</div>

			{/* Revenue Summary Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(metrics.revenue.current)}</div>
						<p className="text-xs text-muted-foreground">Last 30 days</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(metrics.orders.avgValue)}</div>
						<p className="text-xs text-muted-foreground">Per transaction</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{metrics.revenue.change > 0 ? "+" : ""}
							{metrics.revenue.change.toFixed(1)}%
						</div>
						<p className="text-xs text-muted-foreground">vs previous period</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Daily Average</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(metrics.revenue.current / 30)}</div>
						<p className="text-xs text-muted-foreground">Revenue per day</p>
					</CardContent>
				</Card>
			</div>

			{/* Charts */}
			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Daily Revenue Trend</CardTitle>
						<CardDescription>Revenue performance over the last 30 days</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[350px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={dailyRevenue}>
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
									<XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
									<YAxis
										className="text-xs"
										tick={{ fill: "hsl(var(--muted-foreground))" }}
										tickFormatter={(value) => `$${value / 1000}k`}
									/>
									<Tooltip formatter={(value: number) => formatCurrency(value)} />
									<Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Revenue by Channel</CardTitle>
						<CardDescription>Performance across different sales channels</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[350px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={channelData}>
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
									<XAxis
										dataKey="channel"
										className="text-xs"
										tick={{ fill: "hsl(var(--muted-foreground))" }}
									/>
									<YAxis
										className="text-xs"
										tick={{ fill: "hsl(var(--muted-foreground))" }}
										tickFormatter={(value) => `$${value / 1000}k`}
									/>
									<Tooltip formatter={(value: number) => formatCurrency(value)} />
									<Bar dataKey="revenue" fill="#3b82f6" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
