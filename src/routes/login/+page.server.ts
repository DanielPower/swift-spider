import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { zx } from "zodix";

const loginRequestSchema = z.object({
	username: z.string(),
});

export const load = (async ({ locals }) => {
	if (locals.session.data.username) {
		throw redirect(302, "/");
	}
	return {
		title: "Login",
		session: locals.session.data,
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = await zx.parseForm(request, loginRequestSchema);
		await locals.session.set({ username: formData.username });
		return {};
	},
};
