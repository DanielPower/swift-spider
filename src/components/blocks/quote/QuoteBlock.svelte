<script lang="ts">
	import type { Quote } from "$lib/types";
	export let node: Quote;
</script>

<div class="container">
	<div>
		<div class="quote">
			<p>
				{node.content}
			</p>
		</div>
	</div>
	{#if node.source.trim()}
		<div class="source">
			- {node.source}
		</div>
	{/if}
</div>

<style>
	p {
		margin: 0;
	}
	.container {
		display: flex;
		flex-wrap: wrap;
	}
	.quote {
		transform: translateX(0.4rem);
		border-left: 2px solid grey;
		padding-left: 0.5rem;
		width: fit-content;
		display: flex;
		flex-wrap: wrap;
		column-gap: 1rem;
	}
	.source {
		font-style: italic;
		color: grey;
		text-align: right;
		flex-grow: 1;
		margin-right: 1rem;
	}
</style>
