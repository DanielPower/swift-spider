/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{svelte,ts}"],
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				wheat: {
					DEFAULT: "#F5DEB3",
					50: "#FBF3E2",
					100: "#F9ECD3",
					200: "#F5DEB3",
					300: "#EFCA86",
					400: "#E9B759",
					500: "#E3A32C",
					600: "#C2881A",
					700: "#956814",
					800: "#68490E",
					900: "#3B2908",
					950: "#251A05",
				},
			},
		},
	},
	plugins: [],
};
