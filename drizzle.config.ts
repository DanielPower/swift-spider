import type { Config } from "drizzle-kit";

export default {
	schema: "./src/lib/schema.ts",
	out: "./drizzle",
	driver: "better-sqlite",
	dbCredentials: {
		url: "./db.sqlite3",
	},
} satisfies Config;
