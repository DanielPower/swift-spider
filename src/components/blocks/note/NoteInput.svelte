<script lang="ts">
	import { enhance } from "$app/forms";
	import { onMount } from "svelte";

	export let done: () => void;

	let value = "";
	let inputRef: HTMLInputElement;

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Backspace" && value === "") {
			done();
		}
	};

	onMount(() => {
		inputRef.focus();
	});
</script>

<div class="container">
	<div class="block-icon">-</div>
	<form use:enhance={done} method="POST" action="/?/new">
		<input type="hidden" name="blockType" value="note" />
		<input on:keydown={onKeyDown} bind:this={inputRef} bind:value name="content" />
	</form>
</div>

<style>
	input {
		border: none;
		background: none;
		font-size: inherit;
		width: 100%;
		outline: none;
	}
	.container {
		display: flex;
	}
	.block-icon {
		width: 1rem;
		text-align: center;
	}
</style>
