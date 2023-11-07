<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faHome, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
	import Sidebar from "./Sidebar.svelte";
</script>

<div class="container">
	<div class="topbar">
		<a href="/">
			<Fa icon={faHome} size="1.5x" />
		</a>
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
	<div class="sidebar">
		<Sidebar />
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: fit-content(1rem) 1fr;
		grid-template-rows: fit-content(1rem) 1fr;
		grid-template-areas:
			"topbar topbar"
			"sidebar content";
		min-height: 100vh;
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
		grid-area: sidebar;
		max-width: 10rem;
	}
	.content {
		padding: 1rem;
	}
	.nav {
		flex-grow: 1;
		flex-direction: row;
		display: flex;
	}
	.nav.reverse {
		flex-direction: row-reverse;
	}
</style>
