<script lang="ts">
	import { twMerge } from "tailwind-merge";
	let className: string | undefined = undefined;
	export { className as class };
	interface $$restProps extends HTMLAnchorElement {}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
	class={twMerge(
		"text-blue-700 dark:text-teal-200 dark:hover:text-teal-500 hover:text-fuchsia-700",
		className,
	)}
	{...$$restProps}><slot /></a
>
