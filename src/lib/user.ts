import { env } from "$env/dynamic/private";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { user } from "./schema";
import { InvalidUsernameError, UserAlreadyExistsError } from "./errors";

const alphanumeric = /^[a-z0-9]+$/;

export const getUserDatabase = (username: string) => {
	const db = drizzle(new Database(`${env.DATABASE_PATH}/${username}.sqlite3`));
	migrate(db, { migrationsFolder: "drizzle" });
	return db;
};

export const createUser = async (username: string, password: string) => {
	if (alphanumeric.test(username) === false) {
		throw new InvalidUsernameError();
	}
	const db = getUserDatabase(username);
	try {
		await db.insert(user).values({ username, password });
	} catch (error) {
		throw new UserAlreadyExistsError();
	}
	return db;
};
