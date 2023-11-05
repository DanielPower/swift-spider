<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faHome } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="header">
	<a href="/">
		<Fa icon={faHome} size="1.5x" />
	</a>
	<div class="title">{$page.data.title}</div>
</div>
<div class="content">
	<slot />
</div>

<style>
	.title {
		flex-grow: 1;
		text-align: center;
		font-size: 1.1rem;
	}
	.header {
		display: flex;
		background: burlywood;
		padding: 1rem;
	}
	.header a {
		color: black;
	}
	.header a:hover {
		color: white;
	}
	.content {
		padding: 1rem;
	}
</style>
