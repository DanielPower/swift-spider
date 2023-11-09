<script lang="ts">
	import TaskBlock from "./TaskBlock.svelte";
	import NoteBlock from "./NoteBlock.svelte";
	import type { Note, Quote, Task } from "$lib/types";
	import QuoteBlock from "./QuoteBlock.svelte";
	export let nodes: (Note | Task | Quote)[];
</script>

<div class="blocks">
	{#each nodes as node}
		{#if node.type === "note"}
			<NoteBlock note={node} />
		{/if}
		{#if node.type === "task"}
			<TaskBlock task={node} />
		{/if}
		{#if node.type === "quote"}
			<QuoteBlock quote={node} />
		{/if}
	{/each}
</div>

<style>
	.blocks {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}
</style>
