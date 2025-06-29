"use client";

import { BarChart, Home, LineChart, Package, PieChart, Settings, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = {
	Dashboard: [
		{ href: "#", icon: Home, label: "Overview" },
		{ href: "#", icon: ShoppingCart, label: "Revenue" },
		{ href: "#", icon: Package, label: "Inventory" },
		{ href: "#", icon: Users, label: "Customers" },
		{ href: "#", icon: BarChart, label: "Reports" },
	],
	"Statistical Report": [
		{ href: "#", icon: BarChart, label: "Bar Chart" },
		{ href: "#", icon: LineChart, label: "Line Chart" },
		{ href: "#", icon: PieChart, label: "Pie Chart" },
	],
	Other: [{ href: "#", icon: Settings, label: "Settings" }],
};

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="hidden h-screen w-64 flex-col border-r bg-sidebar-background p-4 md:flex">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-sidebar-primary">Elysian Clothing</h1>
			</div>
			<nav className="flex-1 space-y-4">
				{Object.entries(sidebarItems).map(([title, items]) => (
					<div key={title}>
						<h2 className="mb-2 text-sm font-semibold uppercase text-sidebar-foreground/50">{title}</h2>
						<ul className="space-y-1">
							{items.map(({ href, icon: Icon, label }) => (
								<li key={label}>
									<Link href={href}>
										<p
											className={`
                              flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground
                              transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                              ${pathname === href ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""}
                            `}
										>
											<Icon className="h-5 w-5" />
											<span>{label}</span>
										</p>
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>
		</div>
	);
}
