import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { task } from "$lib/schema";
import { getUserDatabase } from "$lib/user";

export const load: PageServerLoad = async ({ locals }) => {
	const db = getUserDatabase(locals.session.data.username);
	const nodes = db.all(sql`
    SELECT *, 'task' AS type
    FROM ${task}
    WHERE ${task.status} != 'done'
  `);

	return {
		title: "Agenda",
		session: locals.session.data,
		nodes,
	};
};
