<script lang="ts">
	import Input from "./blocks/Input.svelte";

	let blockType: "note" | "task" | "quote" | "none" = "none";

	const onKeyDown = (event: KeyboardEvent) => {
		if (blockType !== "none") {
			return;
		}
		if (event.key === "-") {
			blockType = "note";
			event.preventDefault();
		} else if (event.key === ".") {
			blockType = "task";
			event.preventDefault();
		} else if (event.key === "|") {
			blockType = "quote";
			event.preventDefault();
		}
	};

	const done = () => {
		blockType = "none";
	};
</script>

<svelte:window on:keydown={onKeyDown} />

{#if blockType !== "none"}
	<Input {blockType} {done} />
{:else}
	<div class="block-icons">
		<button
			class="block-icon"
			on:click={() => {
				blockType = "note";
			}}>-</button
		>
		<button
			class="block-icon"
			on:click={() => {
				blockType = "task";
			}}>.</button
		>
		<button
			class="block-icon"
			on:click={() => {
				blockType = "quote";
			}}>|</button
		>
	</div>
{/if}

<style>
	.block-icons {
		display: flex;
		column-gap: 1rem;
	}
	.block-icon {
		height: 2rem;
		width: 2rem;
		border: 2px solid brown;
		border-radius: 4px;
		text-align: center;
		background: salmon;
	}
</style>
