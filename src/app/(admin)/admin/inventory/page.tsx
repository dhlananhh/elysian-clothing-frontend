"use client";

import { AlertTriangle, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardLayout } from "@/components/admin/dashboard-layout";
import { Progress } from "@/components/admin/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEcommerceStore } from "@/store/ecommerce-store";

export default function InventoryPage() {
	const { products, initializeData } = useEcommerceStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory] = useState<string | null>(null);

	useEffect(() => {
		if (products.length === 0) {
			initializeData();
		}
	}, [products, initializeData]);

	// Filter products based on search and category
	const filteredProducts = products.filter((product) => {
		const matchesSearch =
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.sku.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = !selectedCategory || product.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	// Calculate inventory metrics
	const totalValue = products.reduce((sum, p) => sum + p.stock * p.cost, 0);
	const lowStockCount = products.filter((p) => p.stock <= p.reorderPoint).length;
	const outOfStockCount = products.filter((p) => p.stock === 0).length;
	const categories = Array.from(new Set(products.map((p) => p.category)));

	// Prepare data for inventory by category chart
	const categoryData = categories.map((category) => {
		const categoryProducts = products.filter((p) => p.category === category);
		return {
			category: category.charAt(0).toUpperCase() + category.slice(1),
			value: categoryProducts.reduce((sum, p) => sum + p.stock * p.cost, 0),
			units: categoryProducts.reduce((sum, p) => sum + p.stock, 0),
		};
	});

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(value);
	};

	const getStockStatus = (product: (typeof products)[0]) => {
		if (product.stock === 0) return { label: "Out of Stock", color: "destructive" as const };
		if (product.stock <= product.reorderPoint) return { label: "Low Stock", color: "outline" as const };
		return { label: "In Stock", color: "default" as const };
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
				<p className="text-muted-foreground">Track product stock levels and inventory value</p>
			</div>

			{/* Inventory Metrics */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
						<p className="text-xs text-muted-foreground">Across all products</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{products.length}</div>
						<p className="text-xs text-muted-foreground">Active products</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
						<p className="text-xs text-muted-foreground">Need reordering</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">{outOfStockCount}</div>
						<p className="text-xs text-muted-foreground">Unavailable</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Inventory by Category Chart */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Inventory Value by Category</CardTitle>
						<CardDescription>Distribution of inventory investment</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={categoryData}>
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
									<XAxis
										dataKey="category"
										className="text-xs"
										tick={{ fill: "hsl(var(--muted-foreground))" }}
									/>
									<YAxis
										className="text-xs"
										tick={{ fill: "hsl(var(--muted-foreground))" }}
										tickFormatter={(value) => `$${value / 1000}k`}
									/>
									<Tooltip
										formatter={(value: number) => formatCurrency(value)}
										labelFormatter={(label) => `Category: ${label}`}
									/>
									<Bar dataKey="value" fill="#3b82f6" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Critical Stock Alerts */}
				<Card>
					<CardHeader>
						<CardTitle>Critical Stock Alerts</CardTitle>
						<CardDescription>Items requiring immediate attention</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{products
								.filter((p) => p.stock <= p.reorderPoint)
								.sort((a, b) => a.stock - b.stock)
								.slice(0, 5)
								.map((product) => (
									<div key={product.id} className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<AlertTriangle className="h-4 w-4 text-yellow-500" />
											<div>
												<p className="text-sm font-medium">{product.name}</p>
												<p className="text-xs text-muted-foreground">{product.sku}</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">{product.stock} units</p>
											<p className="text-xs text-red-600">Min: {product.reorderPoint}</p>
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Product Inventory Table */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Product Inventory</CardTitle>
							<CardDescription>Detailed stock levels and status</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search products..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-8 w-[250px]"
								/>
							</div>
							<Button variant="outline" size="sm">
								<Filter className="h-4 w-4 mr-2" />
								Filters
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredProducts.map((product) => {
							const status = getStockStatus(product);
							const stockPercentage = (product.stock / (product.reorderPoint * 2)) * 100;

							return (
								<div key={product.id} className="space-y-2 p-4 border rounded-lg">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4">
											<div>
												<p className="font-medium">{product.name}</p>
												<p className="text-sm text-muted-foreground">{product.sku}</p>
											</div>
											<Badge variant={status.color}>{status.label}</Badge>
											<Badge variant="outline">{product.category}</Badge>
										</div>
										<div className="text-right">
											<p className="font-medium">{product.stock} units</p>
											<p className="text-sm text-muted-foreground">
												Value: {formatCurrency(product.stock * product.cost)}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="flex-1">
											<Progress value={Math.min(stockPercentage, 100)} className="h-2" />
										</div>
										<span className="text-sm text-muted-foreground">
											Reorder at: {product.reorderPoint} units
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
