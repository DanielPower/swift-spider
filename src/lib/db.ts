import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { env } from "$env/dynamic/private";
import { building } from "$app/environment";

// Jank because Sveltekit needs to analyze imports at compile time
// https://kit.svelte.dev/docs/building-your-app#during-the-build
export let db: ReturnType<typeof drizzle>;
if (!building) {
	const sqlite = new Database(`${env.DATABASE_PATH}/db.sqlite3`);
	db = drizzle(sqlite);
	migrate(db, { migrationsFolder: "drizzle" });
}
