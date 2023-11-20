import { env } from "$env/dynamic/private";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

export const notEmpty = <T>(value: T | null | undefined): value is T => {
	return value !== null && value !== undefined;
};

export const getDb = (username: string) => {
	const sqlite = new Database(`${env.DATABASE_PATH}/${username}.sqlite3`);
	const db = drizzle(sqlite);
	return db;
};
