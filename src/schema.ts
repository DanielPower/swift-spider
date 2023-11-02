import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const task = sqliteTable("task", {
	id: integer("id").primaryKey(),
	content: text("content").notNull(),
	status: text("status", { enum: ["todo", "done"] })
		.default("todo")
		.notNull(),
});
