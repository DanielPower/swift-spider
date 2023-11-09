<script lang="ts">
	import type { Quote } from "$lib/types";
	export let quote: Quote;
</script>

<div class="container">
	<div class="block-symbol" />
	<div class="quote">
		<p>
			{quote.content}
		</p>
		<div class="source">
			- {quote.source}
		</div>
	</div>
</div>

<style>
	p {
		margin: 0;
		text-wrap: balance;
	}
	.container {
		display: flex;
	}
	.block-symbol {
		border-right: 2px solid grey;
		transform: translateX(-50%);
		width: 1rem;
		text-align: center;
		margin-right: 1rem;
	}
	.quote {
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
