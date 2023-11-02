import { DATABASE_URL } from "$env/static/private";
import DatabaseConstructor from "better-sqlite3";
import type { Database } from "better-sqlite3";

export const db: Database = new DatabaseConstructor(
	DATABASE_URL.replace("sqlite:", ""),
);
