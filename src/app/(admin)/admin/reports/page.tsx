"use client";

import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Button } from "@/components/ui/button";
import { downloadCSV, generateCSV } from "@/lib/export-utils";
import { generatePDF } from "@/lib/pdf-utils";

export default function ReportsPage() {
	const revenueData = [
		{ month: "January", revenue: 85000, expenses: 45000, profit: 40000 },
		{ month: "February", revenue: 92000, expenses: 48000, profit: 44000 },
		{ month: "March", revenue: 98000, expenses: 52000, profit: 46000 },
		{ month: "April", revenue: 103000, expenses: 55000, profit: 48000 },
		{ month: "May", revenue: 108000, expenses: 58000, profit: 50000 },
		{ month: "June", revenue: 115000, expenses: 62000, profit: 53000 },
		{ month: "July", revenue: 124839, expenses: 68000, profit: 56839 },
	];

	const customerData = [
		{ month: "January", new: 145, churned: 32, total: 2145 },
		{ month: "February", new: 168, churned: 28, total: 2285 },
		{ month: "March", new: 192, churned: 35, total: 2442 },
		{ month: "April", new: 210, churned: 42, total: 2610 },
		{ month: "May", new: 185, churned: 38, total: 2757 },
		{ month: "June", new: 224, churned: 45, total: 2936 },
		{ month: "July", new: 248, churned: 52, total: 3132 },
	];

	const handleExportRevenueCSV = () => {
		const csv = generateCSV(revenueData);
		downloadCSV(csv, "revenue-report.csv");
	};

	const handleExportCustomersCSV = () => {
		const csv = generateCSV(customerData);
		downloadCSV(csv, "customer-report.csv");
	};

	const handleExportPDF = () => {
		generatePDF({
			title: "SaaS Analytics Report",
			subtitle: "Monthly Performance Summary",
			sections: [
				{
					title: "Revenue Summary",
					data: revenueData,
					columns: ["Month", "Revenue", "Expenses", "Profit"],
				},
				{
					title: "Customer Metrics",
					data: customerData,
					columns: ["Month", "New Customers", "Churned", "Total"],
				},
			],
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Reports & Export</h1>
				<p className="text-muted-foreground">Generate and download reports in various formats</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileSpreadsheet className="h-5 w-5" />
							Revenue Report
						</CardTitle>
						<CardDescription>Export revenue data as CSV</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="text-sm text-muted-foreground">
								<p>Includes:</p>
								<ul className="mt-2 list-disc list-inside space-y-1">
									<li>Monthly revenue</li>
									<li>Operating expenses</li>
									<li>Net profit</li>
								</ul>
							</div>
							<Button onClick={handleExportRevenueCSV} className="w-full">
								<Download className="mr-2 h-4 w-4" />
								Download CSV
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileSpreadsheet className="h-5 w-5" />
							Customer Report
						</CardTitle>
						<CardDescription>Export customer metrics as CSV</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="text-sm text-muted-foreground">
								<p>Includes:</p>
								<ul className="mt-2 list-disc list-inside space-y-1">
									<li>New customers</li>
									<li>Churned customers</li>
									<li>Total active customers</li>
								</ul>
							</div>
							<Button onClick={handleExportCustomersCSV} className="w-full">
								<Download className="mr-2 h-4 w-4" />
								Download CSV
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Full Report
						</CardTitle>
						<CardDescription>Complete analytics report as PDF</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="text-sm text-muted-foreground">
								<p>Includes:</p>
								<ul className="mt-2 list-disc list-inside space-y-1">
									<li>Executive summary</li>
									<li>All metrics tables</li>
									<li>Performance analysis</li>
								</ul>
							</div>
							<Button onClick={handleExportPDF} className="w-full">
								<Download className="mr-2 h-4 w-4" />
								Download PDF
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Exports</CardTitle>
					<CardDescription>Your export history</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="flex items-center justify-between py-2 border-b">
							<div className="flex items-center gap-2">
								<FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">revenue-report.csv</span>
							</div>
							<span className="text-xs text-muted-foreground">Just now</span>
						</div>
						<div className="flex items-center justify-between py-2 border-b">
							<div className="flex items-center gap-2">
								<FileText className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">analytics-report.pdf</span>
							</div>
							<span className="text-xs text-muted-foreground">2 hours ago</span>
						</div>
						<div className="flex items-center justify-between py-2">
							<div className="flex items-center gap-2">
								<FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">customer-report.csv</span>
							</div>
							<span className="text-xs text-muted-foreground">Yesterday</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
