import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { env } from "$env/dynamic/private";

const sqlite = new Database(`${env.DATABASE_PATH}/db.sqlite3`);
export const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle" });
