<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let className: string | undefined = undefined;
	export { className as class };

	interface $$restProps extends HTMLButtonAttributes {}
</script>

<button
	class={twMerge(
		`p-1 border border-black bg-gray-100 border-r rounded dark:border-white dark:from-teal-600 dark:to-gray-800 dark:bg-gradient-to-b`,
		className,
	)}
>
	<slot {...$$restProps} />
</button>
