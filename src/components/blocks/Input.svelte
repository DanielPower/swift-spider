<script lang="ts">
	import NoteInput from "./note/NoteInput.svelte";
	import TaskInput from "./task/TaskInput.svelte";
	import QuoteInput from "./quote/QuoteInput.svelte";

	export let blockType: "note" | "task" | "quote";
	export let done: () => void;
</script>

{#if blockType === "note"}
	<NoteInput {done} />
{/if}
{#if blockType === "task"}
	<TaskInput {done} />
{/if}
{#if blockType === "quote"}
	<QuoteInput {done} />
{/if}
