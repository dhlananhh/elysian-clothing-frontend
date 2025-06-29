import { subDays } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
	calculateMetrics,
	generateCustomers,
	generateOrders,
	generateProducts,
	generateRealtimeEvents,
} from "@/lib/ecommerce-data-generator";
import { Customer, DashboardMetrics, Order, Product, RealtimeEvent } from "@/types/ecommerce";

type PersistedEcommerceState = {
	state: Partial<EcommerceStore>;
	version?: number;
};

interface EcommerceStore {
	// Data
	products: Product[];
	customers: Customer[];
	orders: Order[];
	realtimeEvents: RealtimeEvent[];

	// UI State
	dateRange: { start: Date; end: Date };
	selectedChannel: string | null;
	selectedCategory: string | null;

	// Computed
	metrics: DashboardMetrics | null;

	// Actions
	initializeData: () => void;
	setDateRange: (range: { start: Date; end: Date }) => void;
	setSelectedChannel: (channel: string | null) => void;
	setSelectedCategory: (category: string | null) => void;
	addRealtimeEvent: (event: RealtimeEvent) => void;
	refreshMetrics: () => void;
	clearAllData: () => void;
}

export const useEcommerceStore = create<EcommerceStore>()(
	persist(
		(set, get) => ({
			// Initial state
			products: [],
			customers: [],
			orders: [],
			realtimeEvents: [],
			dateRange: {
				start: subDays(new Date(), 30),
				end: new Date(),
			},
			selectedChannel: null,
			selectedCategory: null,
			metrics: null,

			// Initialize demo data
			initializeData: () => {
				const products = generateProducts();
				const customers = generateCustomers(200);
				const orders = generateOrders(30, products, customers);
				const realtimeEvents = generateRealtimeEvents();

				set({ products, customers, orders, realtimeEvents });
				get().refreshMetrics();
			},

			// Update date range
			setDateRange: (range) => {
				set({ dateRange: range });
				get().refreshMetrics();
			},

			// Filter by channel
			setSelectedChannel: (channel) => {
				set({ selectedChannel: channel });
				get().refreshMetrics();
			},

			// Filter by category
			setSelectedCategory: (category) => {
				set({ selectedCategory: category });
				get().refreshMetrics();
			},

			addRealtimeEvent: (event) => {
				set((state) => ({
					realtimeEvents: [event, ...state.realtimeEvents].slice(0, 50),
				}));
			},

			refreshMetrics: () => {
				const { orders, products, dateRange, selectedChannel, selectedCategory } = get();

				let filteredOrders = orders;
				if (selectedChannel) {
					filteredOrders = filteredOrders.filter((o) => o.channel === selectedChannel);
				}
				if (selectedCategory) {
					filteredOrders = filteredOrders.filter((o) =>
						o.items.some((item) => {
							const product = products.find((p) => p.id === item.productId);
							return product?.category === selectedCategory;
						}),
					);
				}

				const metrics = calculateMetrics(filteredOrders, products, dateRange);
				set({ metrics });
			},

			clearAllData: () => {
				localStorage.removeItem("elysian-clothing-store");
				set({
					products: [],
					customers: [],
					orders: [],
					realtimeEvents: [],
					metrics: null,
				});
			},
		}),
		{
			name: "elysian-clothing-store",
			storage: {
				getItem: (name) => {
					const str = localStorage.getItem(name);
					if (!str) return null;

					const parsedData = JSON.parse(str) as PersistedEcommerceState;

					const { state } = parsedData;

					return {
						state: {
							...state,
							dateRange: state.dateRange
								? {
										start: new Date(state.dateRange.start),
										end: new Date(state.dateRange.end),
									}
								: undefined,
							orders: state.orders?.map((order: any) => ({
								...order,
								createdAt: new Date(order.createdAt),
								updatedAt: new Date(order.updatedAt),
								shippedAt: order.shippedAt ? new Date(order.shippedAt) : undefined,
								deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : undefined,
							})),
							customers: state.customers?.map((customer: any) => ({
								...customer,
								firstPurchase: new Date(customer.firstPurchase),
								lastPurchase: new Date(customer.lastPurchase),
							})),
							realtimeEvents: state.realtimeEvents?.map((event: any) => ({
								...event,
								timestamp: new Date(event.timestamp),
							})),
						},
					};
				},
				setItem: (name, value) => {
					try {
						localStorage.setItem(name, JSON.stringify(value));
					} catch (e) {
						console.warn("localStorage quota exceeded, clearing old data...");
						localStorage.removeItem(name);
						try {
							localStorage.setItem(name, JSON.stringify(value));
						} catch (e2) {
							console.error("Failed to store data, skipping persistence");
						}
					}
				},
				removeItem: (name) => {
					localStorage.removeItem(name);
				},
			},
		},
	),
);
