import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { task } from "$lib/schema";
import { db } from "$lib/db";

export const load: PageServerLoad = async () => {
	const nodes = db.all(sql`
    SELECT *, 'task' AS type
    FROM ${task}
    WHERE ${task.status} != 'done'
  `);

	return { title: "Agenda", nodes };
};
