import type { Session } from "svelte-kit-cookie-session";
type SessionData = {
	username: string;
};
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session<SessionData>;
		}
		interface PageData {
			title: string;
			session: SessionData;
		}
		// interface Platform {}
	}
}

export {};
