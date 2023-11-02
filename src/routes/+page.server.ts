import { db } from "$lib/db";
import { z } from "zod";
import { zx } from "zodix";
import type { Actions, PageServerLoad } from "./$types";
import { task } from "../schema";
import { eq } from "drizzle-orm";

const newRequestSchema = z.object({
	content: z.string(),
});

const toggleRequestSchema = z.object({
	id: z.coerce.number(),
	status: z.union([z.literal("todo"), z.literal("done")]),
});

export const load: PageServerLoad = async () => {
	const tasks = await db.select().from(task);
	return { tasks };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const { content } = await zx.parseForm(request, newRequestSchema);
		await db.insert(task).values({ content });
	},
	toggle: async ({ request }) => {
		const { id, status } = await zx.parseForm(request, toggleRequestSchema);
		console.log(id, status);
		await db
			.update(task)
			.set({ status: status === "done" ? "todo" : "done" })
			.where(eq(task.id, id));
	},
};
