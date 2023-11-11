<script lang="ts">
	import Input from "../../../../components/InputField.svelte";
	import dayjs from "dayjs";
	import BlockList from "../../../../components/BlockList.svelte";

	export let data;

	$: isToday = data.currentDay === dayjs().format("YYYY/MM/DD");
</script>

<div class="container">
	<div class="block-container">
		<BlockList nodes={data.nodes} />
	</div>
	{#if isToday}
		<Input />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
		height: 100%;
	}
	.block-container {
		flex-grow: 1;
	}
</style>
