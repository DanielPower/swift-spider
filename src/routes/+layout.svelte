<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faHome, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="container">
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
<div class="content">
	<slot />
</div>

<style>
	.title {
		text-align: center;
		font-size: 1.1rem;
	}
	.container {
		display: flex;
		gap: 1rem;
		background: burlywood;
		padding: 1rem;
	}
	.container a {
		color: black;
	}
	.container a:hover {
		color: white;
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
