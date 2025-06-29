import type { Product, RealtimeEvent } from "@/types/ecommerce";

// Product names for realistic events
const PRODUCT_SAMPLES = [
	"iPhone 15 Pro",
	'MacBook Pro 14"',
	"AirPods Pro",
	"Samsung Galaxy S24",
	"Dell XPS 15",
	"Sony WH-1000XM5",
	'iPad Pro 11"',
	"USB-C Hub",
	"Wireless Charger",
	"iPhone Case",
];

const CITIES = [
	"Tokyo",
	"London",
	"New York",
	"Paris",
	"Sydney",
	"Berlin",
	"Toronto",
	"Singapore",
	"Dubai",
	"Stockholm",
	"San Francisco",
	"Amsterdam",
	"Seoul",
	"Mumbai",
	"Barcelona",
];

const EVENT_TEMPLATES = {
	order: [
		"New order from {city}",
		"Express order placed in {city}",
		"Bulk order received from {city}",
		"Premium customer order - {city}",
	],
	inventory: [
		"Low stock alert: {product}",
		"{product} inventory critical",
		"Restock needed: {product}",
		"Stock replenished: {product}",
	],
	customer: [
		"VIP customer browsing {category}",
		"New customer registered from {city}",
		"Customer returned after 30 days",
		"High-value cart detected",
	],
	milestone: [
		"Daily revenue goal achieved!",
		"1000th order this month",
		"New record: {metric}",
		"Conversion rate up {percent}%",
	],
};

export class RealtimeSimulator {
	private intervalId: NodeJS.Timeout | null = null;
	private eventCount = 0;

	generateEvent(products: Product[]): RealtimeEvent {
		const types: RealtimeEvent["type"][] = ["order", "inventory", "customer", "order"];
		const type = types[Math.floor(Math.random() * types.length)];

		this.eventCount++;

		switch (type) {
			case "order":
				return this.generateOrderEvent();
			case "inventory":
				return this.generateInventoryEvent(products);
			case "customer":
				return this.generateCustomerEvent();
			default:
				return this.generateOrderEvent();
		}
	}

	private generateOrderEvent(): RealtimeEvent {
		const city = CITIES[Math.floor(Math.random() * CITIES.length)];
		const products = [];
		const numProducts = Math.floor(Math.random() * 3) + 1;

		for (let i = 0; i < numProducts; i++) {
			products.push(PRODUCT_SAMPLES[Math.floor(Math.random() * PRODUCT_SAMPLES.length)]);
		}

		const total = Math.floor(Math.random() * 2000) + 100;
		const template = EVENT_TEMPLATES.order[Math.floor(Math.random() * EVENT_TEMPLATES.order.length)];

		return {
			id: `evt_${Date.now()}_${this.eventCount}`,
			type: "order",
			title: template.replace("{city}", city),
			description: `${products.join(" + ")} - $${total}`,
			timestamp: new Date(),
			data: { city, products, total },
		};
	}

	private generateInventoryEvent(products: Product[]): RealtimeEvent {
		const product = products[Math.floor(Math.random() * products.length)];
		const template = EVENT_TEMPLATES.inventory[Math.floor(Math.random() * EVENT_TEMPLATES.inventory.length)];

		return {
			id: `evt_${Date.now()}_${this.eventCount}`,
			type: "inventory",
			title: template.replace("{product}", product.name),
			description: `Only ${product.stock} units remaining`,
			timestamp: new Date(),
			data: { product },
		};
	}

	private generateCustomerEvent(): RealtimeEvent {
		const city = CITIES[Math.floor(Math.random() * CITIES.length)];
		const categories = ["laptops", "smartphones", "audio", "accessories"];
		const category = categories[Math.floor(Math.random() * categories.length)];
		const template = EVENT_TEMPLATES.customer[Math.floor(Math.random() * EVENT_TEMPLATES.customer.length)];

		return {
			id: `evt_${Date.now()}_${this.eventCount}`,
			type: "customer",
			title: template.replace("{city}", city).replace("{category}", category),
			description: "Potential high-value opportunity",
			timestamp: new Date(),
			data: { city, category },
		};
	}

	start(callback: (event: RealtimeEvent) => void, products: Product[]) {
		// Generate initial event immediately
		callback(this.generateEvent(products));

		// Then generate events at random intervals
		const scheduleNext = () => {
			const delay = Math.random() * 15000 + 5000; // 5-20 seconds
			this.intervalId = setTimeout(() => {
				callback(this.generateEvent(products));
				scheduleNext();
			}, delay);
		};

		scheduleNext();
	}

	stop() {
		if (this.intervalId) {
			clearTimeout(this.intervalId);
			this.intervalId = null;
		}
	}
}

// Revenue counter animation helper
export function animateValue(
	start: number,
	end: number,
	duration: number,
	onUpdate: (value: number) => void,
	onComplete?: () => void,
) {
	const startTime = Date.now();
	const difference = end - start;

	const animate = () => {
		const elapsed = Date.now() - startTime;
		const progress = Math.min(elapsed / duration, 1);

		// Easing function for smooth animation
		const easeOutQuart = 1 - Math.pow(1 - progress, 4);
		const current = start + difference * easeOutQuart;

		onUpdate(current);

		if (progress < 1) {
			requestAnimationFrame(animate);
		} else {
			onComplete?.();
		}
	};

	animate();
}
