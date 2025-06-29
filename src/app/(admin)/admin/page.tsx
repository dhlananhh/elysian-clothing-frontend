"use client";

import { DollarSign, Package, RefreshCw, ShoppingCart, Users } from "lucide-react";
import { useEffect } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnimatedMetricCard } from "@/components/admin/animated-metric-card";
import { DashboardSkeleton } from "@/components/admin/dashboard-skeleton";
import { LiveOrderFeed } from "@/components/admin/live-order-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEcommerceStore } from "@/store/ecommerce-store";

export default function DashboardPage() {
	const { metrics, initializeData, clearAllData } = useEcommerceStore();

	useEffect(() => {
		if (!metrics) {
			initializeData();
		}
	}, [metrics, initializeData]);

	if (!metrics) {
		return <DashboardSkeleton />;
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);
	};

	const revenueChartData = metrics.revenue.trend.map((value, index) => ({
		day: index + 1,
		revenue: value,
	}));

	return (
		<div className="space-y-6">
			<div className="relative overflow-hidden rounded-lg gradient-subtle p-6 -m-6 mb-0">
				<div className="relative z-10 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">Elysian Clothing Analytics</h1>
						<p className="text-muted-foreground">Real-time insights for your electronics retail business</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							clearAllData();
							setTimeout(() => initializeData(), 100);
						}}
						className="gap-2 btn-hover"
					>
						<RefreshCw className="h-4 w-4" />
						Reset Demo Data
					</Button>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<AnimatedMetricCard
					title="Total Revenue"
					value={metrics.revenue.current}
					previousValue={metrics.revenue.previous}
					format={formatCurrency}
					icon={DollarSign}
					showTrend={true}
				/>
				<AnimatedMetricCard
					title="Orders Today"
					value={metrics.orders.count}
					previousValue={Math.floor(metrics.orders.count * 0.9)}
					icon={ShoppingCart}
					showTrend={true}
				/>
				<AnimatedMetricCard
					title="Active Customers"
					value={metrics.customers.active}
					previousValue={metrics.customers.active - metrics.customers.new}
					icon={Users}
					showTrend={true}
				/>
				<AnimatedMetricCard
					title="Low Stock Items"
					value={metrics.inventory.lowStock}
					icon={Package}
					animate={false}
				/>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card className="col-span-full lg:col-span-2">
					<CardHeader>
						<CardTitle>Revenue Trend</CardTitle>
						<CardDescription>Daily revenue over the last 30 days</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={revenueChartData}>
									<defs>
										<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
											<stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
									<XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
									<YAxis
										className="text-xs"
										tick={{ fill: "hsl(var(--muted-foreground))" }}
										tickFormatter={(value) => `$${value / 1000}k`}
									/>
									<Tooltip
										formatter={(value: number) => formatCurrency(value)}
										labelFormatter={(label) => `Day ${label}`}
									/>
									<Area
										type="monotone"
										dataKey="revenue"
										stroke="#3b82f6"
										fillOpacity={1}
										fill="url(#colorRevenue)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Top Products</CardTitle>
						<CardDescription>Best selling items this period</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{metrics.topProducts.slice(0, 5).map((product, index) => (
								<div key={product.id} className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<span className="text-sm font-medium">{index + 1}.</span>
										<div>
											<p className="text-sm font-medium leading-none">{product.name}</p>
											<p className="text-xs text-muted-foreground">{product.category}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium">{formatCurrency(product.price)}</p>
										<p className="text-xs text-muted-foreground">{product.stock} in stock</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="col-span-full">
				<LiveOrderFeed />
			</div>
		</div>
	);
}
