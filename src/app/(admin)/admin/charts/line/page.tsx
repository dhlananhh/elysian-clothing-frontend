import { ChurnRateChart } from "@/components/admin/charts/churn-rate-chart";
import { RevenueChart } from "@/components/admin/charts/revenue-chart";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export default function LineChartPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Line & Area Chart Examples</h1>
				<p className="text-muted-foreground">Time series data visualization for trends and patterns</p>
			</div>

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Revenue Trends</CardTitle>
						<CardDescription>Actual vs projected monthly recurring revenue</CardDescription>
					</CardHeader>
					<CardContent>
						<RevenueChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Churn Rate Over Time</CardTitle>
						<CardDescription>Monthly customer churn percentage with area chart</CardDescription>
					</CardHeader>
					<CardContent>
						<ChurnRateChart />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
