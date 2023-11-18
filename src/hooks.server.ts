import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { handleSession } from "svelte-kit-cookie-session";
import { redirect } from "@sveltejs/kit";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handle = handleSession(
	{
		secret: "SOME_COMPLEX_SECRET_32_CHARSLONG",
		rolling: true,
	},
	({ event, resolve }) => {
		if (event.url.pathname !== "/login" && !event.locals.session.data.username) {
			throw redirect(302, "/login");
		}
		return resolve(event);
	},
);

