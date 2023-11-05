import { redirect } from "@sveltejs/kit";
import dayjs from "dayjs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	throw redirect(302, dayjs().format("YYYY/MM/DD"));
};
