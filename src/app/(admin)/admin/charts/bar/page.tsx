import { ComposedChartDemo } from "@/components/admin/charts/composed-chart-demo";
import { CustomerGrowthChart } from "@/components/admin/charts/customer-growth-chart";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BarChartPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Bar Chart Examples</h1>
				<p className="text-muted-foreground">Various bar chart implementations for business metrics</p>
			</div>

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Customer Growth Analysis</CardTitle>
						<CardDescription>Track new vs churned customers by month</CardDescription>
					</CardHeader>
					<CardContent>
						<CustomerGrowthChart />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Revenue & Expenses Breakdown</CardTitle>
						<CardDescription>Combined view of revenue, expenses, and profit margin</CardDescription>
					</CardHeader>
					<CardContent>
						<ComposedChartDemo />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
