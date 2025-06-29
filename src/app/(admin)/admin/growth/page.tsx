"use client";

import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export default function GrowthPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Growth Metrics</h1>
				<p className="text-muted-foreground">Business growth and expansion analytics</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Coming Soon</CardTitle>
					<CardDescription>Growth analytics features are under development</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						This page will include growth trends, market expansion opportunities, and performance forecasts.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
