<script lang="ts">
	import Sidebar from "./Sidebar.svelte";
	import { onMount } from "svelte";
	import "../app.css";
	import Navbar from "../components/Navbar.svelte";

	let displayType: "desktop" | "mobile";

	let sidebarOpen = true;
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
<div class="flex flex-col min-h-screen dark:text-white dark:bg-gray-800">
	<div class="text-white bg-red-500 p-2 text-center">
		This is a demo site. All data is temporary and will be deleted periodically. All
		content (including passwords) is stored in plaintext.
	</div>
	<Navbar bind:sidebarOpen />
	<div class="flex flex-grow">
		<div class="sidebar" class:sidebar-open={sidebarOpen}>
			<Sidebar bind:isOpen={sidebarOpen} {displayType} />
		</div>
		<div class="flex-grow max-w-4xl p-2">
			<slot />
		</div>
	</div>
</div>

<style>
	.sidebar {
		width: 0;
		transition: all 0.2s ease-in-out;
		overflow: hidden;
		flex-shrink: 0;
	}
	.sidebar-open {
		width: 6rem;
	}

	@media (max-width: 600px) {
		.sidebar {
			position: fixed;
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
