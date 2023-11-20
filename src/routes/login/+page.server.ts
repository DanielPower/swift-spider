import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { zx } from "zodix";
import { getUserDatabase } from "$lib/user";
import { user } from "$lib/schema";

const loginRequestSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const load = (async ({ locals, url }) => {
	if (locals.session.data.username) {
		throw redirect(302, "/");
	}
	return {
		title: "Login",
		session: locals.session.data,
		status: url.searchParams.get("status"),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const { username, password } = await zx.parseForm(request, loginRequestSchema);
		const db = getUserDatabase(username);
		const userResult = db.select({ password: user.password }).from(user).get();
		if (userResult?.password !== password) {
			throw redirect(302, "/login?status=bad_credentials");
		}
		await locals.session.set({ username });
	},
};
