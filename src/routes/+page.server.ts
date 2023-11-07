import { redirect } from "@sveltejs/kit";
import dayjs from "dayjs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	// TODO get the user's timezone
	throw redirect(302, dayjs().tz("America/St_Johns").format("YYYY/MM/DD"));
};
