<script lang="ts">
	import { enhance } from "$app/forms";
	import type { KeyboardEventHandler } from "svelte/elements";

	let value = "";
	let blockType: "note" | "task" | "none" = "none";
	let inputRef: HTMLInputElement;

	$: blockSymbol = {
		none: " ",
		note: "-",
		task: "○",
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
				default:
					break;
			}
		}
	};
</script>

<form
	autocomplete="off"
	method="POST"
	action="/?/new"
	use:enhance={({ cancel }) => {
		if (blockType === "none" || value === "") {
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
	<input type="hidden" name="blockType" value={blockType} />
	<div class="input">
		{#if blockType !== "none"}
			<div class="block-symbol">{blockSymbol}</div>
		{/if}
		<input bind:this={inputRef} bind:value on:keydown={onKeydown} name="content" />
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
