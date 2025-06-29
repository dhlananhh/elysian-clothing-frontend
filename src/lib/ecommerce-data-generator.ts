import { addDays, startOfDay, subDays } from "date-fns";
import type {
	Customer,
	CustomerSegment,
	DashboardMetrics,
	Order,
	OrderStatus,
	Product,
	RealtimeEvent,
	SalesChannel,
} from "@/types/ecommerce";

// Product catalog
const PRODUCT_CATALOG: Partial<Product>[] = [
	// Smartphones
	{ name: "iPhone 15 Pro", category: "smartphones", price: 999, cost: 650, reorderPoint: 50 },
	{ name: "Samsung Galaxy S24", category: "smartphones", price: 899, cost: 580, reorderPoint: 40 },
	{ name: "Google Pixel 8", category: "smartphones", price: 699, cost: 450, reorderPoint: 30 },

	// Laptops
	{ name: 'MacBook Pro 14"', category: "laptops", price: 1999, cost: 1300, reorderPoint: 20 },
	{ name: "Dell XPS 15", category: "laptops", price: 1599, cost: 1050, reorderPoint: 25 },
	{ name: "ThinkPad X1 Carbon", category: "laptops", price: 1799, cost: 1170, reorderPoint: 15 },

	// Accessories
	{ name: "AirPods Pro", category: "accessories", price: 249, cost: 150, reorderPoint: 100 },
	{ name: "iPhone 15 Case", category: "accessories", price: 49, cost: 15, reorderPoint: 200 },
	{ name: "USB-C Hub", category: "accessories", price: 79, cost: 35, reorderPoint: 150 },
	{ name: "Wireless Charger", category: "accessories", price: 39, cost: 18, reorderPoint: 180 },

	// Audio
	{ name: "Sony WH-1000XM5", category: "audio", price: 399, cost: 250, reorderPoint: 40 },
	{ name: "Bose QC45", category: "audio", price: 329, cost: 210, reorderPoint: 35 },

	// Tablets
	{ name: 'iPad Pro 11"', category: "tablets", price: 799, cost: 520, reorderPoint: 30 },
	{ name: "Samsung Tab S9", category: "tablets", price: 699, cost: 450, reorderPoint: 25 },

	// Smart Home
	{ name: "Echo Dot", category: "smart-home", price: 49, cost: 25, reorderPoint: 120 },
	{ name: "Google Nest Hub", category: "smart-home", price: 99, cost: 55, reorderPoint: 80 },
];

const COUNTRIES = [
	{ code: "US", name: "United States", weight: 0.4 },
	{ code: "UK", name: "United Kingdom", weight: 0.15 },
	{ code: "DE", name: "Germany", weight: 0.12 },
	{ code: "FR", name: "France", weight: 0.08 },
	{ code: "JP", name: "Japan", weight: 0.08 },
	{ code: "CA", name: "Canada", weight: 0.07 },
	{ code: "AU", name: "Australia", weight: 0.05 },
	{ code: "IT", name: "Italy", weight: 0.05 },
];

// Generate complete product catalog
export function generateProducts(): Product[] {
	return PRODUCT_CATALOG.map(
		(product, index) =>
			({
				id: `prod_${index + 1}`,
				sku: `SKU-${product.category?.toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
				stock: Math.floor(Math.random() * 200) + 50,
				supplier: ["TechDist Inc", "Global Electronics", "Premium Suppliers"][Math.floor(Math.random() * 3)],
				active: true,
				...product,
			}) as Product,
	);
}

// Generate customers with realistic distribution (reduced for localStorage)
export function generateCustomers(count: number): Customer[] {
	const customers: Customer[] = [];
	const segments: CustomerSegment[] = ["tech-enthusiast", "business", "casual", "student", "vip"];
	const channels = ["google", "facebook", "direct", "referral", "email"];

	// Limit to 200 customers to avoid localStorage quota
	const actualCount = Math.min(count, 200);

	for (let i = 0; i < actualCount; i++) {
		const orderCount = Math.floor(Math.random() * 20) + 1;
		const avgOrderValue = Math.random() * 500 + 100;
		const firstPurchase = subDays(new Date(), Math.floor(Math.random() * 730)); // Up to 2 years ago

		customers.push({
			id: `cust_${i + 1}`,
			email: `customer${i + 1}@example.com`,
			name: `Customer ${i + 1}`,
			segment: segments[Math.floor(Math.random() * segments.length)],
			lifetimeValue: orderCount * avgOrderValue,
			orderCount,
			avgOrderValue,
			firstPurchase,
			lastPurchase: addDays(firstPurchase, Math.floor(Math.random() * 180)),
			country: selectWeighted(COUNTRIES).code,
			acquisitionChannel: channels[Math.floor(Math.random() * channels.length)],
		});
	}

	return customers;
}

// Generate orders with realistic patterns
export function generateOrders(days: number, products: Product[], customers: Customer[]): Order[] {
	const orders: Order[] = [];
	const channels: SalesChannel[] = ["website", "shopify", "amazon", "ebay"];
	const statuses: OrderStatus[] = ["delivered", "delivered", "delivered", "shipped", "processing"];

	for (let day = 0; day < days; day++) {
		const date = subDays(new Date(), day);
		const isWeekend = date.getDay() === 0 || date.getDay() === 6;
		const isBlackFriday = date.getMonth() === 10 && date.getDate() >= 24 && date.getDate() <= 27;

		// Base order count with variations
		let orderCount = isWeekend ? 80 : 120;
		if (isBlackFriday) orderCount *= 3; // Black Friday spike
		orderCount += Math.floor(Math.random() * 40) - 20; // Random variation

		for (let o = 0; o < orderCount; o++) {
			const customer = customers[Math.floor(Math.random() * customers.length)];
			const itemCount = Math.floor(Math.random() * 3) + 1;
			const items = [];
			let subtotal = 0;

			for (let i = 0; i < itemCount; i++) {
				const product = products[Math.floor(Math.random() * products.length)];
				const quantity = product.category === "accessories" ? Math.floor(Math.random() * 3) + 1 : 1;
				const discount = Math.random() > 0.7 ? Math.random() * 0.2 : 0; // 30% chance of discount

				items.push({
					productId: product.id,
					quantity,
					price: product.price,
					discount: product.price * discount,
				});

				subtotal += (product.price - product.price * discount) * quantity;
			}

			const tax = subtotal * 0.08; // 8% tax
			const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
			const total = subtotal + tax + shipping;
			const status = statuses[Math.floor(Math.random() * statuses.length)];

			orders.push({
				id: `order_${orders.length + 1}`,
				orderNumber: `TGP-${String(orders.length + 1).padStart(6, "0")}`,
				customerId: customer.id,
				items,
				subtotal,
				tax,
				shipping,
				total,
				status,
				channel: channels[Math.floor(Math.random() * channels.length)],
				createdAt: date,
				updatedAt: date,
				shippedAt: status !== "pending" && status !== "processing" ? addDays(date, 1) : undefined,
				deliveredAt: status === "delivered" ? addDays(date, 3) : undefined,
				country: customer.country,
				region:
					customer.country === "US"
						? ["West", "East", "Central", "South"][Math.floor(Math.random() * 4)]
						: "International",
			});
		}
	}

	return orders;
}

// Generate dashboard metrics from orders
export function calculateMetrics(
	orders: Order[],
	products: Product[],
	dateRange: { start: Date; end: Date },
): DashboardMetrics {
	const filteredOrders = orders.filter((o) => o.createdAt >= dateRange.start && o.createdAt <= dateRange.end);

	const previousStart = subDays(dateRange.start, 30);
	const previousEnd = subDays(dateRange.end, 30);
	const previousOrders = orders.filter((o) => o.createdAt >= previousStart && o.createdAt <= previousEnd);

	// Revenue calculations
	const currentRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0);
	const previousRevenue = previousOrders.reduce((sum, o) => sum + o.total, 0);
	const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

	// Calculate daily revenue trend
	const trend = [];
	for (let i = 29; i >= 0; i--) {
		const dayOrders = filteredOrders.filter((o) => {
			const orderDay = startOfDay(o.createdAt);
			const targetDay = startOfDay(subDays(dateRange.end, i));
			return orderDay.getTime() === targetDay.getTime();
		});
		trend.push(dayOrders.reduce((sum, o) => sum + o.total, 0));
	}

	// Top products by revenue
	const productRevenue = new Map<string, number>();
	filteredOrders.forEach((order) => {
		order.items.forEach((item) => {
			const current = productRevenue.get(item.productId) || 0;
			productRevenue.set(item.productId, current + (item.price - item.discount) * item.quantity);
		});
	});

	const topProducts = Array.from(productRevenue.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([productId]) => products.find((p) => p.id === productId)!)
		.filter(Boolean);

	// Customer metrics
	const uniqueCustomers = new Set(filteredOrders.map((o) => o.customerId));
	const previousUniqueCustomers = new Set(previousOrders.map((o) => o.customerId));
	const newCustomers = Array.from(uniqueCustomers).filter((c) => !previousUniqueCustomers.has(c));

	// Inventory metrics
	const lowStockProducts = products.filter((p) => p.stock <= p.reorderPoint).length;
	const inventoryValue = products.reduce((sum, p) => sum + p.cost * p.stock, 0);

	return {
		revenue: {
			current: currentRevenue,
			previous: previousRevenue,
			change: revenueChange,
			trend,
		},
		orders: {
			count: filteredOrders.length,
			avgValue: currentRevenue / filteredOrders.length,
			change: ((filteredOrders.length - previousOrders.length) / previousOrders.length) * 100,
		},
		customers: {
			active: uniqueCustomers.size,
			new: newCustomers.length,
			retention: ((uniqueCustomers.size - newCustomers.length) / uniqueCustomers.size) * 100,
		},
		inventory: {
			totalValue: inventoryValue,
			lowStock: lowStockProducts,
			turnoverRate: 4.2, // Simplified for demo
		},
		topProducts,
		recentOrders: filteredOrders.slice(0, 10),
	};
}

// Generate realtime events
export function generateRealtimeEvents(): RealtimeEvent[] {
	const events: RealtimeEvent[] = [
		{
			id: "evt_1",
			type: "order",
			title: "New order from Tokyo",
			description: "iPhone 15 Pro + AirPods Pro - $1,248",
			timestamp: new Date(),
		},
		{
			id: "evt_2",
			type: "inventory",
			title: "Low stock alert",
			description: 'MacBook Pro 14" - Only 18 units remaining',
			timestamp: subDays(new Date(), 0.1),
		},
		{
			id: "evt_3",
			type: "customer",
			title: "VIP customer activity",
			description: "High-value customer browsing gaming laptops",
			timestamp: subDays(new Date(), 0.2),
		},
	];

	return events;
}

// Utility function for weighted selection
function selectWeighted<T extends { weight: number }>(items: T[]): T {
	const random = Math.random();
	let accumulator = 0;

	for (const item of items) {
		accumulator += item.weight;
		if (random <= accumulator) return item;
	}

	return items[items.length - 1];
}
