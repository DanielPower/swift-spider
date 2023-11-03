import { db } from "$lib/db";
import { z } from "zod";
import { zx } from "zodix";
import type { Actions, PageServerLoad } from "./$types";
import { task, note, node } from "../schema";
import { eq } from "drizzle-orm";

const newRequestSchema = z.object({
	blockType: z.union([z.literal("note"), z.literal("task")]),
	content: z.string(),
});

const toggleRequestSchema = z.object({
	id: z.coerce.number(),
	status: z.union([z.literal("todo"), z.literal("done")]),
});

export const load: PageServerLoad = async () => {
	const tasks = await db
		.select({
			id: task.id,
			content: task.content,
			status: task.status,
			created_at: node.created_at,
		})
		.from(task)
		.innerJoin(node, eq(task.node_id, node.id));
	const notes = await db
		.select({ id: note.id, content: note.content, created_at: node.created_at })
		.from(note)
		.innerJoin(node, eq(note.node_id, node.id));
	const nodes = [
		...tasks.map((task) => ({ ...task, blockType: "task" as const })),
		...notes.map((note) => ({ ...note, blockType: "note" as const })),
	].sort((a, b) => a.created_at.localeCompare(b.created_at));
	return { nodes };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const { blockType, content } = await zx.parseForm(request, newRequestSchema);
		if (blockType === "note") {
			const { id: nodeId } = db
				.insert(node)
				.values({})
				.returning({ id: node.id })
				.get();
			await db.insert(note).values({ content, node_id: nodeId });
			return;
		}
		if (blockType === "task") {
			const { id: nodeId } = db
				.insert(node)
				.values({})
				.returning({ id: node.id })
				.get();
			await db.insert(task).values({ content, node_id: nodeId });
			return;
		}
	},
	toggle: async ({ request }) => {
		const { id, status } = await zx.parseForm(request, toggleRequestSchema);
		await db
			.update(task)
			.set({ status: status === "done" ? "todo" : "done" })
			.where(eq(task.id, id));
	},
};
