<script lang="ts">
	import { twMerge } from "tailwind-merge";
	export let label: string;

	let className: string | undefined = undefined;
	export { className as class };

	interface $$restProps extends HTMLInputElement {}
</script>

<label class="flex flex-col">
	{label}
	<input
		class={twMerge(
			"rounded-sm border border-black dark:bg-gray-800 dark:border-gray-100",
			className,
		)}
		{...$$restProps}
	/>
</label>
