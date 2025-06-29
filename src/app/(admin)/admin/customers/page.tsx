"use client";

import { useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { useEcommerceStore } from "@/store/ecommerce-store";

export default function CustomersPage() {
	const { customers, metrics, initializeData } = useEcommerceStore();

	useEffect(() => {
		if (!metrics) {
			initializeData();
		}
	}, [metrics, initializeData]);

	if (!metrics) {
		return (
			<div className="flex items-center justify-center h-96">
				<p className="text-muted-foreground">Loading customer data...</p>
			</div>
		);
	}

	// Customer segmentation data
	const segmentCounts = customers.reduce(
		(acc, customer) => {
			acc[customer.segment] = (acc[customer.segment] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	const segmentData = Object.entries(segmentCounts).map(([segment, count]) => ({
		name: segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " "),
		value: count,
	}));

	const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

	// Top customers by lifetime value
	const topCustomers = [...customers].sort((a, b) => b.lifetimeValue - a.lifetimeValue).slice(0, 10);

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
				<h1 className="text-3xl font-bold tracking-tight">Customer Analytics</h1>
				<p className="text-muted-foreground">Customer segmentation and lifetime value analysis</p>
			</div>

			{/* Customer Metrics */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Total Customers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{customers.length}</div>
						<p className="text-xs text-muted-foreground">All time</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Active Customers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{metrics.customers.active}</div>
						<p className="text-xs text-muted-foreground">Last 30 days</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">New Customers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{metrics.customers.new}</div>
						<p className="text-xs text-muted-foreground">This period</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{metrics.customers.retention.toFixed(1)}%</div>
						<p className="text-xs text-muted-foreground">Customer retention</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Customer Segments */}
				<Card>
					<CardHeader>
						<CardTitle>Customer Segments</CardTitle>
						<CardDescription>Distribution by customer type</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[350px]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={segmentData}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
									>
										{segmentData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Top Customers */}
				<Card>
					<CardHeader>
						<CardTitle>Top Customers</CardTitle>
						<CardDescription>By lifetime value</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{topCustomers.map((customer, index) => (
								<div key={customer.id} className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<span className="text-sm font-medium">{index + 1}.</span>
										<div>
											<p className="text-sm font-medium">{customer.name}</p>
											<p className="text-xs text-muted-foreground">{customer.segment}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium">{formatCurrency(customer.lifetimeValue)}</p>
										<p className="text-xs text-muted-foreground">{customer.orderCount} orders</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
