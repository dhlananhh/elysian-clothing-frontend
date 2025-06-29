"use client";

import { format } from "date-fns";
import { Activity, Circle, Package, ShoppingBag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RealtimeSimulator } from "@/lib/realtime-simulator";
import { useEcommerceStore } from "@/store/ecommerce-store";
import type { RealtimeEvent } from "@/types/ecommerce";

export function LiveOrderFeed() {
	const { products, addRealtimeEvent, realtimeEvents } = useEcommerceStore();
	const [isLive] = useState(true);
	const [simulator] = useState(() => new RealtimeSimulator());

	useEffect(() => {
		if (!isLive || products.length === 0) return;

		simulator.start((event) => {
			addRealtimeEvent(event);
		}, products);

		return () => {
			simulator.stop();
		};
	}, [isLive, products, simulator, addRealtimeEvent]);

	const getEventIcon = (type: RealtimeEvent["type"]) => {
		switch (type) {
			case "order":
				return ShoppingBag;
			case "inventory":
				return Package;
			case "customer":
				return Users;
			default:
				return Activity;
		}
	};

	const getEventColor = (type: RealtimeEvent["type"]) => {
		switch (type) {
			case "order":
				return "text-green-500";
			case "inventory":
				return "text-yellow-500";
			case "customer":
				return "text-blue-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<Card className="h-full glass relative overflow-hidden">
			<div className="absolute inset-0 gradient-subtle opacity-50" />
			<CardHeader className="relative z-10">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Live Activity Feed</CardTitle>
						<CardDescription>Real-time store events</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10">
							<Circle
								className={`h-3 w-3 ${isLive ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400"} animate-pulse`}
							/>
							<span className="text-sm font-medium">{isLive ? "LIVE" : "PAUSED"}</span>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4 max-h-[400px] overflow-y-auto">
					{realtimeEvents.length === 0 ? (
						<p className="text-muted-foreground text-center py-8">Waiting for live events...</p>
					) : (
						realtimeEvents.slice(0, 20).map((event, index) => {
							const Icon = getEventIcon(event.type);
							const colorClass = getEventColor(event.type);

							return (
								<div
									key={event.id}
									className={`flex items-start gap-3 ${index === 0 ? "animate-in slide-in-from-top-1" : ""}`}
								>
									<div className={`mt-0.5 ${colorClass}`}>
										<Icon className="h-4 w-4" />
									</div>
									<div className="flex-1 space-y-1">
										<p className="text-sm font-medium leading-none">{event.title}</p>
										<p className="text-sm text-muted-foreground">{event.description}</p>
									</div>
									<time className="text-xs text-muted-foreground">{format(event.timestamp, "HH:mm:ss")}</time>
								</div>
							);
						})
					)}
				</div>
			</CardContent>
		</Card>
	);
}
