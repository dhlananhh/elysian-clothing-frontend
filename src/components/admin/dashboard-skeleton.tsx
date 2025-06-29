import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
	return (
		<div className="space-y-6">
			{/* Header Skeleton */}
			<div className="flex items-center justify-between">
				<div>
					<Skeleton className="h-8 w-64 mb-2" />
					<Skeleton className="h-4 w-96" />
				</div>
				<Skeleton className="h-10 w-32" />
			</div>

			{/* Metrics Grid Skeleton */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[...Array(4)].map((_, i) => (
					<Card key={i}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-4" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-32 mb-1" />
							<Skeleton className="h-3 w-24" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Charts Row Skeleton */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card className="col-span-full lg:col-span-2">
					<CardHeader>
						<Skeleton className="h-6 w-32 mb-1" />
						<Skeleton className="h-4 w-48" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-32 mb-1" />
						<Skeleton className="h-4 w-48" />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="flex items-center justify-between">
									<div className="space-y-1">
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-3 w-24" />
									</div>
									<Skeleton className="h-4 w-16" />
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Activity Feed Skeleton */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-32 mb-1" />
					<Skeleton className="h-4 w-48" />
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<Skeleton className="h-2 w-2 rounded-full" />
									<div>
										<Skeleton className="h-4 w-48 mb-1" />
										<Skeleton className="h-3 w-32" />
									</div>
								</div>
								<Skeleton className="h-3 w-16" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
