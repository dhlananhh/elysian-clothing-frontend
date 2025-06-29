"use client";

import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export default function PerformancePage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Performance Metrics</h1>
				<p className="text-muted-foreground">Operational performance and efficiency tracking</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Coming Soon</CardTitle>
					<CardDescription>Performance analytics features are under development</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						This page will include operational KPIs, efficiency metrics, and performance benchmarks.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
