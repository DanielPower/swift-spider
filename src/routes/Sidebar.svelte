<script lang="ts">
	export let isOpen = false;
	export let displayType: "desktop" | "mobile";
	const close = () => {
		if (displayType === "mobile") {
			isOpen = false;
		}
	};
</script>

<nav>
	<a href="/" on:click={close}>Today</a>
	<a href="/agenda" on:click={close}>Agenda</a>
</nav>
<div class="gradient" />

<style>
	nav {
		background: wheat;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	nav a {
		padding: 1rem;
		color: black;
		text-decoration: none;
	}
	nav ul li a:hover {
		color: white;
	}
</style>
