<script lang="ts">
	import Task from "../../../../components/Task.svelte";
	import Note from "../../../../components/Note.svelte";
	import Input from "../../../../components/Input.svelte";

	export let data;
</script>

<div class="container">
	{#each data.nodes as node}
		{#if node.block_type === "note"}
			<Note note={node} />
		{/if}
		{#if node.block_type === "task"}
			<Task task={node} />
		{/if}
	{/each}
	<Input />
</div>
