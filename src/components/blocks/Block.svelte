<script lang="ts">
	import type { Note, Quote, Task } from "$lib/types";
	import NoteBlock from "./note/NoteBlock.svelte";
	import TaskBlock from "./task/TaskBlock.svelte";
	import QuoteBlock from "./quote/QuoteBlock.svelte";

	export let node: Note | Task | Quote;
</script>

{#if node.type === "note"}
	<NoteBlock {node} />
{/if}
{#if node.type === "task"}
	<TaskBlock {node} />
{/if}
{#if node.type === "quote"}
	<QuoteBlock {node} />
{/if}
