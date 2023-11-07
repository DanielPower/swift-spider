<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
</script>

<a href="/{$page.data.previousDay}">
	<Fa icon={faArrowLeft} size="1.5x" />
</a>

<style>
	a {
		color: black;
	}
	a:hover {
		color: white;
	}
</style>
