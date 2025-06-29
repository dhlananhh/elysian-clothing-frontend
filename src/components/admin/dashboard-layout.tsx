"use client";

import {
	BarChart3,
	DollarSign,
	Download,
	Home,
	LineChart,
	Package,
	PieChart,
	Settings,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/admin/theme-toggle";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/admin/ui/sidebar";

const menuItems = [
	{
		title: "Overview",
		icon: Home,
		href: "/",
	},
	{
		title: "Revenue",
		icon: DollarSign,
		href: "/revenue",
	},
	{
		title: "Inventory",
		icon: Package,
		href: "/inventory",
	},
	{
		title: "Customers",
		icon: Users,
		href: "/customers",
	},
	{
		title: "Reports",
		icon: Download,
		href: "/reports",
	},
];

const chartTypes = [
	{
		title: "Bar Chart",
		icon: BarChart3,
		href: "/charts/bar",
	},
	{
		title: "Line Chart",
		icon: LineChart,
		href: "/charts/line",
	},
	{
		title: "Pie Chart",
		icon: PieChart,
		href: "/charts/pie",
	},
];

export function DashboardLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader>
					<div className="flex items-center gap-2 px-2 py-1.5">
						<div className="p-2 rounded-lg gradient-primary">
							<BarChart3 className="h-6 w-6 text-white" />
						</div>
						<span className="font-semibold text-lg">TechGear Pro</span>
					</div>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{menuItems.map((item) => (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton asChild isActive={pathname === item.href}>
											<Link href={item.href}>
												<item.icon className="h-4 w-4" />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup>
						<SidebarGroupLabel>Chart Examples</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{chartTypes.map((item) => (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton asChild isActive={pathname === item.href}>
											<Link href={item.href}>
												<item.icon className="h-4 w-4" />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/settings">
									<Settings className="h-4 w-4" />
									<span>Settings</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					<div className="flex-1" />
					<ThemeToggle />
				</header>
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
