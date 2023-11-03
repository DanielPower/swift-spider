import { relations, sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const task = sqliteTable("task", {
	id: integer("id").primaryKey(),
	content: text("content").notNull(),
	status: text("status", { enum: ["todo", "done"] })
		.default("todo")
		.notNull(),
	node_id: integer("node_id").notNull(),
});

export const note = sqliteTable("note", {
	id: integer("id").primaryKey(),
	content: text("content").notNull(),
	node_id: integer("node_id").notNull(),
});

export const node = sqliteTable("node", {
	id: integer("id").primaryKey(),
	created_at: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});

export const taskRelations = relations(task, ({ one }) => ({
	node: one(node, {
		fields: [task.node_id],
		references: [node.id],
	}),
}));

export const noteRelations = relations(note, ({ one }) => ({
	node: one(node, {
		fields: [note.node_id],
		references: [node.id],
	}),
}));
