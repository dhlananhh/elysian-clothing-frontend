import type React from "react";
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen w-full bg-background">
			<Sidebar />

			<main className="flex-1 overflow-auto">
				<div className="p-4 sm:p-6 lg:p-8">{children}</div>
			</main>
		</div>
	);
}
