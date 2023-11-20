import { relations, sql } from "drizzle-orm";
import { integer, text, sqliteTable, index } from "drizzle-orm/sqlite-core";

export const task = sqliteTable("task", {
	id: integer("id").primaryKey(),
	content: text("content").notNull(),
	status: text("status", { enum: ["todo", "done"] })
		.default("todo")
		.notNull(),
	nodeId: integer("node_id").notNull(),
});

export const note = sqliteTable("note", {
	id: integer("id").primaryKey(),
	content: text("content").notNull(),
	nodeId: integer("node_id").notNull(),
});

export const quote = sqliteTable("quote", {
	id: integer("id").primaryKey(),
	content: text("content").notNull(),
	source: text("source").notNull(),
	nodeId: integer("node_id").notNull(),
});

export const node = sqliteTable(
	"node",
	{
		id: integer("id").primaryKey(),
		createdAt: text("created_at")
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		type: text("type", { enum: ["task", "note", "quote"] }).notNull(),
	},
	(table) => ({
		createdAtIdx: index("created_at_idx").on(table.createdAt),
	}),
);

export const user = sqliteTable("user", {
	username: text("username").primaryKey(),
	password: text("password").notNull(),
	singleton: text("singleton").default("singleton").notNull().unique(),
});

export const taskRelations = relations(task, ({ one }) => ({
	node: one(node, {
		fields: [task.nodeId],
		references: [node.id],
	}),
}));

export const noteRelations = relations(note, ({ one }) => ({
	node: one(node, {
		fields: [note.nodeId],
		references: [node.id],
	}),
}));

export const quoteRelations = relations(quote, ({ one }) => ({
	node: one(node, {
		fields: [quote.nodeId],
		references: [node.id],
	}),
}));
