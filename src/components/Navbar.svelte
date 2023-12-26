<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faHamburger, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

	export let sidebarOpen: boolean;
	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};
</script>

<div class="flex gap-2 p-2 bg-wheat-300 dark:bg-gray-700 dark:text-white">
	<button class="hover:text-white" on:click={toggleSidebar}>
		<Fa icon={faHamburger} size="1.5x" />
	</button>
	<div class="flex flex-grow flex-row-reverse">
		{#if $page.data.leftNavComponent}
			<svelte:component this={$page.data.leftNavComponent} />
		{/if}
	</div>
	<div class="text-center text-lg">{$page.data.title}</div>
	<div class="flex flex-row flex-grow">
		{#if $page.data.rightNavComponent}
			<svelte:component this={$page.data.rightNavComponent} />
		{/if}
	</div>
	<a href="/about">
		<Fa icon={faQuestionCircle} size="1.5x" />
	</a>
</div>
