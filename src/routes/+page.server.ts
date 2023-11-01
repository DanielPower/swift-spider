import { db } from '$lib/db';
import { z } from 'zod';
import { zx } from 'zodix';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const completeRequestSchema = z.object({
	id: z.coerce.number()
});

export const load: PageServerLoad = async () => {
	const query = db.prepare('SELECT * FROM task');
	const result = query.all();
	console.log(result);
	return { todos: result };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const data = await request.formData();
		const content = data.get('content');
		if (!content || typeof content !== 'string') {
			return fail(400);
		}
		const query = db.prepare(`
      INSERT INTO task (content)
      VALUES ($content)
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
	}
};
