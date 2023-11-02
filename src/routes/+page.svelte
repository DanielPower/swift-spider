<script lang="ts">
	import Task from "../components/Task.svelte";

	export let data;
</script>

<h1>Swift Spider</h1>
{#each data.tasks as task}
	<Task {task} toggleAction="?/toggle" />
{/each}
<form method="POST" action="?/new">
	<input name="content" />
</form>
