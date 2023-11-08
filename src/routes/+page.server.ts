import { redirect } from "@sveltejs/kit";
import dayjs from "dayjs";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { db } from "$lib/db";
import { zx } from "zodix";
import { node, note, task } from "$lib/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async () => {
	// TODO get the user's timezone
	throw redirect(302, dayjs().tz("America/St_Johns").format("YYYY/MM/DD"));
};

const newRequestSchema = z.object({
	blockType: z.union([z.literal("note"), z.literal("task")]),
	content: z.string(),
});

const toggleRequestSchema = z.object({
	id: z.coerce.number(),
	status: z.union([z.literal("todo"), z.literal("done")]),
});

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
				await db.insert(note).values({ id: nodeId, content, nodeId });
				return;
			}
			if (blockType === "task") {
				await db.insert(task).values({ id: nodeId, content, nodeId });
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
