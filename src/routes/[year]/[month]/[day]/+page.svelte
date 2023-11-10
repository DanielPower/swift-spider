<script lang="ts">
	import Input from "../../../../components/InputField.svelte";
	import dayjs from "dayjs";
	import BlockList from "../../../../components/BlockList.svelte";

	export let data;

	$: isToday = data.currentDay === dayjs().format("YYYY/MM/DD");
</script>

<div class="container">
	<BlockList nodes={data.nodes} />
	{#if isToday}
		<Input />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}
</style>
