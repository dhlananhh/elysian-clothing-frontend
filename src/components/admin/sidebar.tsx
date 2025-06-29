"use client";

import {
	BarChart,
	FolderKanban,
	Home,
	LineChart,
	Package,
	PieChart,
	Settings,
	ShoppingCart,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = {
	DASHBOARD: [
		{ href: "/admin", icon: Home, label: "Overview" },
		{ href: "/admin/revenue", icon: ShoppingCart, label: "Revenue" },
		{ href: "/admin/inventory", icon: Package, label: "Inventory" },
		{ href: "/admin/customers", icon: Users, label: "Customers" },
		{ href: "/admin/reports", icon: FolderKanban, label: "Reports" },
	],
	"STATISTICAL REPORT": [
		{ href: "/admin/charts/bar", icon: BarChart, label: "Bar Chart" },
		{ href: "/admin/charts/line", icon: LineChart, label: "Line Chart" },
		{ href: "/admin/charts/pie", icon: PieChart, label: "Pie Chart" },
	],
	OTHER: [{ href: "/admin/settings", icon: Settings, label: "Settings" }],
};

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden h-full w-64 flex-col border-r bg-sidebar-background p-4 md:flex">
			<div className="mb-6 flex items-center gap-2">
				<h1 className="text-2xl font-bold tracking-tight text-sidebar-primary">Elysian Clothing</h1>
			</div>

			<nav className="flex-1 space-y-6">
				{Object.entries(sidebarItems).map(([title, items]) => (
					<div key={title}>
						<h2 className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-sidebar-foreground/60">
							{title}
						</h2>
						<ul className="space-y-1">
							{items.map(({ href, icon: Icon, label }) => {
								const isActive =
									href === "/admin" ? pathname === href : pathname.startsWith(href) && href !== "/admin";

								return (
									<li key={label}>
										<Link href={href}>
											<p
												className={cn(
													"flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground",
													"transition-all duration-200 ease-in-out",
													"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1",
													isActive &&
														"bg-sidebar-primary font-semibold text-sidebar-primary-foreground shadow-md",
												)}
											>
												<Icon className="h-5 w-5 flex-shrink-0" />
												<span className="truncate">{label}</span>
											</p>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</nav>
		</aside>
	);
}
