<script lang="ts">
	import TaskBlock from "./TaskBlock.svelte";
	import NoteBlock from "./NoteBlock.svelte";
	import type { Note, Task } from "$lib/types";
	export let nodes: (Note | Task)[];
</script>

{#each nodes as node}
	{#if node.type === "note"}
		<NoteBlock note={node} />
	{/if}
	{#if node.type === "task"}
		<TaskBlock task={node} />
	{/if}
{/each}
