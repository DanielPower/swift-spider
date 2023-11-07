import { db } from "$lib/db";
import { z } from "zod";
import { zx } from "zodix";
import type { Actions, PageServerLoad } from "./$types";
import { task, note, node } from "$lib/schema";
import { eq, sql } from "drizzle-orm";
import { notEmpty } from "$lib/util";
import { getTimezoneOffset } from "date-fns-tz";

const nodeSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	type: z.union([z.literal("task"), z.literal("note")]),
});

const getNodesSchema = z.array(
	z.union([
		z.object({
			node: nodeSchema.merge(z.object({ type: z.literal("task") })),
			task: z.object({
				content: z.string(),
				status: z.union([z.literal("todo"), z.literal("done")]),
			}),
		}),
		z.object({
			node: nodeSchema.merge(z.object({ type: z.literal("note") })),
			note: z.object({
				content: z.string(),
			}),
		}),
	]),
);

const newRequestSchema = z.object({
	blockType: z.union([z.literal("note"), z.literal("task")]),
	content: z.string(),
});

const toggleRequestSchema = z.object({
	id: z.coerce.number(),
	status: z.union([z.literal("todo"), z.literal("done")]),
});

export const load: PageServerLoad = async ({ params }) => {
	// TODO get the user's timezone
	const timezoneOffset = `${getTimezoneOffset("America/St_Johns") / 1000} seconds`;
	const date = [params.year, params.month, params.day].join("-");
	const nodes = getNodesSchema
		.parse(
			await db
				.select()
				.from(node)
				.leftJoin(task, eq(task.nodeId, node.id))
				.leftJoin(note, eq(note.nodeId, node.id))
				.where(
					sql`date(
            ${node.createdAt}, 
            ${timezoneOffset}
          ) = ${date}`,
				),
		)
		.map((item) => {
			if ("task" in item) {
				return { ...item.node, ...item.task };
			} else if ("note" in item) {
				return { ...item.node, ...item.note };
			}
		})
		.filter(notEmpty);
	return { title: date, nodes };
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
