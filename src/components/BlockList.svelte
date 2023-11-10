<script lang="ts">
	import type { Note, Quote, Task } from "$lib/types";
	import Block from "./blocks/Block.svelte";
	export let nodes: (Note | Task | Quote)[];
</script>

<div class="blocks">
	{#each nodes as node}
		<Block {node} />
	{/each}
</div>

<style>
	.blocks {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}
</style>
