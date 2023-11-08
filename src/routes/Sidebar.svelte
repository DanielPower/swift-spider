<script lang="ts">
	export let isOpen = false;
	const close = () => {
		isOpen = false;
	};
</script>

<nav>
	<a href="/" on:click={close}>Today</a>
	<a href="/agenda" on:click={close}>Agenda</a>
</nav>

<style>
	nav {
		background: wheat;
		padding: 1rem;
		height: 100%;
	}
	nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	nav a {
		color: black;
		text-decoration: none;
	}
	nav ul li a:hover {
		color: white;
	}
</style>
