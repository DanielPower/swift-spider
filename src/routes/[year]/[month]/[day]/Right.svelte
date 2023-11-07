<script lang="ts">
	import { page } from "$app/stores";
	import Fa from "svelte-fa";
	import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<a href="/{$page.data.nextDay}">
	<Fa icon={faArrowRight} size="1.5x" />
</a>

<style>
	a {
		color: black;
	}
	a:hover {
		color: white;
	}
</style>
