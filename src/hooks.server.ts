import { readdirSync } from "fs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { handleSession } from "svelte-kit-cookie-session";
import { redirect } from "@sveltejs/kit";
import { building } from "$app/environment";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { env } from "$env/dynamic/private";
import { unauthorizedRoutes } from "$lib/constants";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handle = handleSession(
	{
		secret: "SOME_COMPLEX_SECRET_32_CHARSLONG",
		rolling: true,
	},
	({ event, resolve }) => {
		if (
			!unauthorizedRoutes.includes(event.url.pathname) &&
			!event.locals.session.data.username
		) {
			throw redirect(302, "/login");
		}
		return resolve(event);
	},
);

if (!building) {
	const databases = readdirSync(env.DATABASE_PATH).filter((file) =>
		file.endsWith(".sqlite3"),
	);
	for (const database of databases) {
		const sqlite = new Database(`${env.DATABASE_PATH}/${database}`);
		const db = drizzle(sqlite);
		migrate(db, { migrationsFolder: "drizzle" });
	}
}
