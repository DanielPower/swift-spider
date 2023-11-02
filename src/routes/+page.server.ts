import { db } from "$lib/db";
import { z } from "zod";
import { zx } from "zodix";
import type { Actions, PageServerLoad } from "./$types";

const tasksSchema = z.array(
	z.object({
		id: z.number(),
		content: z.string(),
		status: z.union([
			z.literal("complete"),
			z.literal("in-progress"),
			z.literal("todo"),
		]),
	}),
);

const newRequestSchema = z.object({
	content: z.string(),
});

const completeRequestSchema = z.object({
	id: z.coerce.number(),
});

export const load: PageServerLoad = async () => {
	const query = db.prepare("SELECT * FROM task");
	const todos = tasksSchema.parse(query.all());
	return { todos };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const { content } = await zx.parseForm(request, newRequestSchema);
		const query = db.prepare(`
			INSERT INTO task 
			(content) VALUES ($content)
		`);
		query.run({ content });
	},
	complete: async ({ request }) => {
		const { id } = await zx.parseForm(request, completeRequestSchema);
		const query = db.prepare(`
		    UPDATE task
		    SET status='complete'
		    WHERE id=$id
		  `);
		query.run({ id });
	},
};
