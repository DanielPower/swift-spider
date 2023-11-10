<script lang="ts">
	import { enhance } from "$app/forms";
	import { onMount } from "svelte";

	export let done: () => void;

	let quoteValue = "";
	let sourceValue = "";
	let inputRef: HTMLInputElement;

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Backspace" && quoteValue === "" && sourceValue === "") {
			done();
		}
	};

	onMount(() => {
		inputRef.focus();
	});
</script>

<form use:enhance={done} method="POST" action="/?/new">
	<div class="container">
		<div class="block-symbol" />
		<div class="quote">
			<input type="submit" hidden />
			<input type="hidden" name="blockType" value="quote" />
			<input
				on:keydown={onKeyDown}
				bind:this={inputRef}
				bind:value={quoteValue}
				name="content"
			/>
		</div>
	</div>
	<div class="source">
		-
		<input
			on:keydown={onKeyDown}
			bind:value={sourceValue}
			name="source"
			placeholder="Confuscious"
		/>
	</div>
</form>

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
	}
	.quote {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		column-gap: 1rem;
	}
	.quote input {
		width: 100%;
	}
	.source {
		display: flex;
		column-gap: 0.5rem;
		font-style: italic;
		color: grey;
		flex-grow: 1;
		margin-right: 1rem;
	}
	.source input {
		text-align: right;
		width: 100%;
		color: grey;
	}
</style>
