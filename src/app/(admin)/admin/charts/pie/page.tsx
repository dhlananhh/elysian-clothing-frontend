import { PieChartDemo } from "@/components/admin/charts/pie-chart-demo";
import { RadarChartDemo } from "@/components/admin/charts/radar-chart-demo";
import { ScatterPlotDemo } from "@/components/admin/charts/scatter-plot-demo";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export default function PieChartPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Advanced Chart Types</h1>
				<p className="text-muted-foreground">Pie, radar, and scatter plots for comprehensive data analysis</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Customer Distribution by Plan</CardTitle>
						<CardDescription>Breakdown of customers across subscription tiers</CardDescription>
					</CardHeader>
					<CardContent>
						<PieChartDemo />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Performance Metrics Radar</CardTitle>
						<CardDescription>Current performance vs targets across key metrics</CardDescription>
					</CardHeader>
					<CardContent>
						<RadarChartDemo />
					</CardContent>
				</Card>

				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>CAC vs LTV Analysis</CardTitle>
						<CardDescription>Customer acquisition cost compared to lifetime value</CardDescription>
					</CardHeader>
					<CardContent>
						<ScatterPlotDemo />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
