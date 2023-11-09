<script lang="ts">
	import { enhance } from "$app/forms";
	import type { KeyboardEventHandler } from "svelte/elements";

	let value = "";
	let quoteSource = "";
	let blockType: "note" | "task" | "quote" | "none" = "none";
	let inputRef: HTMLInputElement;

	$: blockSymbol = {
		none: " ",
		note: "-",
		task: "○",
		quote: "|",
	}[blockType];

	const onKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (blockType === "none") {
			event.preventDefault();
			switch (event.key) {
				case "-":
					blockType = "note";
					break;
				case ".":
					blockType = "task";
					break;
				case "|":
					blockType = "quote";
					break;
				default:
					break;
			}
		}
		if (value === "" && event.key === "Backspace") {
			blockType = "none";
			return;
		}
	};
</script>

<form
	autocomplete="off"
	method="POST"
	action="/?/new"
	use:enhance={({ cancel }) => {
		if (
			blockType === "none" ||
			value.trim() === "" ||
			(blockType === "quote" && quoteSource.trim() === "")
		) {
			cancel();
			return;
		}
		return async ({ update }) => {
			blockType = "none";
			await update();
			inputRef.focus();
		};
	}}
>
	<!-- This is a mess. Generic refactor incoming -->
	<input type="submit" hidden />
	<input type="hidden" name="blockType" value={blockType} />
	<div class="input">
		{#if blockType !== "none"}
			<div class="block-symbol">{blockSymbol}</div>
		{/if}
		<input bind:this={inputRef} bind:value on:keydown={onKeydown} name="content" />
		{#if blockType === "quote"}
			<input name="source" bind:value={quoteSource} />
		{/if}
	</div>
</form>

<style>
	input {
		background: none;
		border: none;
		border-style: none;
		width: 100%;
		margin: 0;
		padding: 0;
	}
	input:focus {
		outline: none;
	}
	.block-symbol {
		width: 1rem;
	}
	.input {
		display: flex;
		border-bottom: 1px solid black;
	}
</style>
