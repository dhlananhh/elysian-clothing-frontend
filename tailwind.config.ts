import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/admin/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {},
	plugins: [require("tailwindcss-animate")],
};

export default config;
