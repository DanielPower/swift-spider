<script lang="ts">
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
		<a
			class="p-4 hover:text-white dark:hover:text-black"
			href={link.href}
			on:click={close}>{link.name}</a
		>
	{/each}
</nav>
<div class="gradient" />
