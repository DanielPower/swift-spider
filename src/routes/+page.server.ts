import { redirect } from "@sveltejs/kit";
import dayjs from "dayjs";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { zx } from "zodix";
import { node, note, quote, task } from "$lib/schema";
import { eq } from "drizzle-orm";
import { getUserDatabase } from "$lib/user";

export const load: PageServerLoad = async () => {
	// TODO get the user's timezone
	throw redirect(302, dayjs().tz("America/St_Johns").format("YYYY/MM/DD"));
};

const newRequestSchema = z.union([
	z.object({
		blockType: z.literal("note"),
		content: z.string(),
	}),
	z.object({
		blockType: z.literal("task"),
		content: z.string(),
	}),
	z.object({
		blockType: z.literal("quote"),
		content: z.string(),
		source: z.string(),
	}),
]);

const toggleRequestSchema = z.object({
	id: z.coerce.number(),
	status: z.union([z.literal("todo"), z.literal("done")]),
});

export const actions: Actions = {
	new: async ({ request, locals }) => {
		const db = getUserDatabase(locals.session.data.username);
		db.transaction(async () => {
			const formData = await zx.parseForm(request, newRequestSchema);
			const { id: nodeId } = db
				.insert(node)
				.values({ type: formData.blockType })
				.returning({ id: node.id })
				.get();
			if (formData.blockType === "note") {
				await db.insert(note).values({ id: nodeId, content: formData.content, nodeId });
				return;
			}
			if (formData.blockType === "task") {
				await db.insert(task).values({ id: nodeId, content: formData.content, nodeId });
				return;
			}
			if (formData.blockType === "quote") {
				await db.insert(quote).values({
					id: nodeId,
					content: formData.content,
					source: formData.source,
					nodeId,
				});
				return;
			}
		});
	},
	toggle: async ({ request, locals }) => {
		const { id, status } = await zx.parseForm(request, toggleRequestSchema);
		const db = getUserDatabase(locals.session.data.username);
		await db
			.update(task)
			.set({ status: status === "done" ? "todo" : "done" })
			.where(eq(task.id, id));
	},
};
