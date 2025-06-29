"use client";

import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export default function ChurnPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Churn Analysis</h1>
				<p className="text-muted-foreground">Customer retention and churn metrics</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Coming Soon</CardTitle>
					<CardDescription>Churn analysis features are under development</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						This page will include customer churn trends, risk factors, and retention strategies.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
