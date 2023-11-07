import type { PageLoad } from "./$types";
import Left from "./Left.svelte";
import Right from "./Right.svelte";

export const load: PageLoad = ({ data }) => {
	return { ...data, leftNavComponent: Left, rightNavComponent: Right };
};
