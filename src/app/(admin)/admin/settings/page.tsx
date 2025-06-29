"use client";

import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground">Configure your dashboard preferences</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Dashboard Settings</CardTitle>
					<CardDescription>Customize your analytics experience</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						Settings configuration will be available in the production version.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
