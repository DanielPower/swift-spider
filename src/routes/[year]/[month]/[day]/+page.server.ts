import { db } from "$lib/db";
import { z } from "zod";
import type { PageServerLoad } from "./$types";
import { task, note, node } from "$lib/schema";
import { eq, sql } from "drizzle-orm";
import { notEmpty } from "$lib/util";
import { getTimezoneOffset } from "date-fns-tz";
import dayjs from "dayjs";

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
	return {
		title: date,
		nodes,
		currentDay: dayjs(date).format("YYYY/MM/DD"),
		nextDay: dayjs(date).add(1, "day").format("YYYY/MM/DD"),
		previousDay: dayjs(date).subtract(1, "day").format("YYYY/MM/DD"),
	};
};
