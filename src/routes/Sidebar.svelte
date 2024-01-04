<script lang="ts">
	import A from "../components/A.svelte";

	export let isOpen = false;
	export let displayType: "desktop" | "mobile";
	const close = () => {
		if (displayType === "mobile") {
			isOpen = false;
		}
	};

	const links = [
		{ name: "Today", href: "/" },
		{ name: "Agenda", href: "/agenda" },
		{ name: "Logout", href: "/logout" },
	];
</script>

<nav class="bg-wheat dark:bg-gray-600 flex flex-col h-full">
	{#each links as link}
		<A class="p-4" href={link.href} on:click={close}>{link.name}</A>
	{/each}
</nav>
<div class="gradient" />
