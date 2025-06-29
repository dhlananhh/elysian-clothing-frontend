// E-commerce specific types for TechGear Pro

export interface Product {
	id: string;
	sku: string;
	name: string;
	category: ProductCategory;
	price: number;
	cost: number;
	stock: number;
	reorderPoint: number;
	supplier: string;
	image?: string;
	active: boolean;
}

export type ProductCategory =
	| "smartphones"
	| "laptops"
	| "tablets"
	| "accessories"
	| "audio"
	| "wearables"
	| "smart-home"
	| "gaming";

export interface Order {
	id: string;
	orderNumber: string;
	customerId: string;
	items: OrderItem[];
	subtotal: number;
	tax: number;
	shipping: number;
	total: number;
	status: OrderStatus;
	channel: SalesChannel;
	createdAt: Date;
	updatedAt: Date;
	shippedAt?: Date;
	deliveredAt?: Date;
	country: string;
	region: string;
}

export interface OrderItem {
	productId: string;
	quantity: number;
	price: number;
	discount: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

export type SalesChannel = "website" | "shopify" | "amazon" | "ebay" | "retail" | "wholesale";

export interface Customer {
	id: string;
	email: string;
	name: string;
	segment: CustomerSegment;
	lifetimeValue: number;
	orderCount: number;
	avgOrderValue: number;
	firstPurchase: Date;
	lastPurchase: Date;
	country: string;
	acquisitionChannel: string;
}

export type CustomerSegment = "tech-enthusiast" | "business" | "casual" | "student" | "vip";

export interface InventoryMovement {
	id: string;
	productId: string;
	type: "in" | "out" | "adjustment";
	quantity: number;
	reason: string;
	timestamp: Date;
	orderId?: string;
}

export interface DashboardMetrics {
	revenue: {
		current: number;
		previous: number;
		change: number;
		trend: number[];
	};
	orders: {
		count: number;
		avgValue: number;
		change: number;
	};
	customers: {
		active: number;
		new: number;
		retention: number;
	};
	inventory: {
		totalValue: number;
		lowStock: number;
		turnoverRate: number;
	};
	topProducts: Product[];
	recentOrders: Order[];
}

export interface RealtimeEvent {
	id: string;
	type: "order" | "return" | "inventory" | "customer";
	title: string;
	description: string;
	timestamp: Date;
	data?: any;
}
