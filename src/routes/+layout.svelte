<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faHamburger, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
	import Sidebar from "./Sidebar.svelte";
	import { onMount } from "svelte";

	let sidebarOpen = false;
	let displayType: "desktop" | "mobile";

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};
	onMount(() => {
		displayType = window.innerWidth > 600 ? "desktop" : "mobile";
	});
</script>

<svelte:window
	on:resize={() => {
		if (displayType === "desktop" && window.innerWidth < 600) {
			displayType = "mobile";
			sidebarOpen = false;
		}
		if (displayType === "mobile" && window.innerWidth > 600) {
			displayType = "desktop";
			sidebarOpen = true;
		}
	}}
/>
<div class="container">
	<div class="topbar">
		{#if displayType === "mobile"}
			<button class="hamburger" on:click={toggleSidebar}>
				<Fa icon={faHamburger} size="1.5x" />
			</button>
		{/if}
		<div class="nav reverse">
			{#if $page.data.leftNavComponent}
				<svelte:component this={$page.data.leftNavComponent} />
			{/if}
		</div>
		<div class="title">{$page.data.title}</div>
		<div class="nav">
			{#if $page.data.rightNavComponent}
				<svelte:component this={$page.data.rightNavComponent} />
			{/if}
		</div>
		<a href="/about">
			<Fa icon={faQuestionCircle} size="1.5x" />
		</a>
	</div>
	<div class="lower-container">
		<div class="sidebar" class:sidebar-open={sidebarOpen}>
			<Sidebar bind:isOpen={sidebarOpen} />
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</div>

<style>
	.hamburger {
		background: none;
		border: none;
	}
	.hamburger:hover {
		color: white;
	}
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.lower-container {
		display: flex;
		flex-grow: 1;
	}
	.title {
		text-align: center;
		font-size: 1.1rem;
	}
	.topbar {
		display: flex;
		gap: 1rem;
		grid-area: topbar;
		background: burlywood;
		padding: 1rem;
	}
	.topbar a {
		color: black;
	}
	.topbar a:hover {
		color: white;
	}
	.sidebar {
		width: 8rem;
		margin-left: -8rem;
		transition: all 0.2s ease-in-out;
	}
	.sidebar-open {
		margin-left: 0;
	}
	.content {
		padding: 1rem;
		flex-grow: 1;
		flex-basis: 100%;
		flex-shrink: 0;
	}
	.nav {
		flex-grow: 1;
		flex-direction: row;
		display: flex;
	}
	.nav.reverse {
		flex-direction: row-reverse;
	}

	@media (max-width: 600px) {
		.sidebar {
			position: absolute;
			left: -100%;
			width: 100%;
			height: 100%;
			opacity: 0%;
		}
		.sidebar-open.sidebar {
			left: 0;
			opacity: 100%;
		}
	}
</style>
