import { db } from "$lib/db";
import { z } from "zod";
import { zx } from "zodix";
import type { Actions, PageServerLoad } from "./$types";
import { task } from "../schema";
import { eq } from "drizzle-orm";

const newRequestSchema = z.object({
	content: z.string(),
});

const completeRequestSchema = z.object({
	id: z.coerce.number(),
});

export const load: PageServerLoad = async () => {
	const todos = await db.select().from(task);
	return { todos };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const { content } = await zx.parseForm(request, newRequestSchema);
		await db.insert(task).values({ content });
	},
	complete: async ({ request }) => {
		const { id } = await zx.parseForm(request, completeRequestSchema);
		db.update(task).set({ status: "complete" }).where(eq(task.id, id));
	},
};
