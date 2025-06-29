"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Dashboard error:", error);
	}, [error]);

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<Card className="max-w-md w-full">
				<CardHeader>
					<div className="flex items-center gap-2">
						<AlertTriangle className="h-6 w-6 text-destructive" />
						<CardTitle>Something went wrong!</CardTitle>
					</div>
					<CardDescription>We encountered an error while loading the dashboard.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="p-3 bg-muted rounded-md">
							<p className="text-sm font-mono text-muted-foreground">
								{error.message || "An unexpected error occurred"}
							</p>
						</div>
						<div className="flex gap-2">
							<Button onClick={reset} className="gap-2">
								<RefreshCw className="h-4 w-4" />
								Try again
							</Button>
							<Button variant="outline" onClick={() => (window.location.href = "/")}>
								Go to Dashboard
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
