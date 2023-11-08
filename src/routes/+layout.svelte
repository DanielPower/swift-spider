<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faHamburger, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
	import Sidebar from "./Sidebar.svelte";

	let sidebarOpen = false;
	let displayType: "desktop" | "mobile" =
		window.innerWidth > 600 ? "desktop" : "mobile";

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};
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
		<button
			class="hamburger"
			class:hamburger-show={displayType === "mobile"}
			on:click={toggleSidebar}
		>
			<Fa icon={faHamburger} size="1.5x" />
		</button>
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
			<Sidebar />
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
		opacity: 0%;
		pointer-events: none;
		transition: all 0.2s ease-in-out;
	}
	.hamburger:hover {
		color: white;
	}
	.hamburger.hamburger-show {
		opacity: 100%;
		pointer-events: all;
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
