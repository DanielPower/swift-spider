import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { zx } from "zodix";
import { createUser } from "$lib/user";
import { InvalidUsernameError, UserAlreadyExistsError } from "$lib/errors";

const registerRequestSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const load = (async ({ url, locals }) => {
	if (locals.session.data.username) {
		redirect(302, "/");
	}
	return {
		title: "Create Account",
		session: locals.session.data,
		status: url.searchParams.get("status"),
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await zx.parseForm(request, registerRequestSchema);
		try {
			await createUser(formData.username, formData.password);
		} catch (error) {
			if (error instanceof InvalidUsernameError) {
				redirect(302, "/register?status=invalid_username");
			}
			if (error instanceof UserAlreadyExistsError) {
				redirect(302, "/register?status=username_taken");
			}
		}
		redirect(302, "/login?status=created");
	},
};
