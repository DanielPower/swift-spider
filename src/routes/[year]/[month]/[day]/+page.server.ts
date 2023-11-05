import { db } from "$lib/db";
import { z } from "zod";
import { zx } from "zodix";
import type { Actions, PageServerLoad } from "./$types";
import { task, note, node } from "$lib/schema";
import { eq, sql } from "drizzle-orm";

const newRequestSchema = z.object({
	blockType: z.union([z.literal("note"), z.literal("task")]),
	content: z.string(),
});

const toggleRequestSchema = z.object({
	id: z.coerce.number(),
	status: z.union([z.literal("todo"), z.literal("done")]),
});

export const load: PageServerLoad = async ({ params }) => {
	const date = [params.year, params.month, params.day].join("-");
	const parsedNodes = (
		await db
			.select()
			.from(node)
			.leftJoin(task, eq(task.nodeId, node.id))
			.leftJoin(note, eq(note.nodeId, node.id))
			.where(sql`date(${node.createdAt}) = ${date}`)
	).map((item) => ({
		...item.node,
		...item[item.node.type],
	}));
	console.log(parsedNodes);
	return { nodes: [] };
};

export const actions: Actions = {
	new: async ({ request }) => {
		db.transaction(async () => {
			const { blockType, content } = await zx.parseForm(request, newRequestSchema);
			const { id: nodeId } = db
				.insert(node)
				.values({ type: blockType })
				.returning({ id: node.id })
				.get();
			if (blockType === "note") {
				await db.insert(note).values({ content, nodeId });
				return;
			}
			if (blockType === "task") {
				await db.insert(task).values({ content, nodeId });
				return;
			}
		});
	},
	toggle: async ({ request }) => {
		const { id, status } = await zx.parseForm(request, toggleRequestSchema);
		await db
			.update(task)
			.set({ status: status === "done" ? "todo" : "done" })
			.where(eq(task.id, id));
	},
};
