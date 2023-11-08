<script lang="ts">
	import Input from "../../../../components/Input.svelte";
	import dayjs from "dayjs";
	import BlockList from "../../../../components/BlockList.svelte";

	export let data;

	$: isToday = data.currentDay === dayjs().format("YYYY/MM/DD");
</script>

<BlockList nodes={data.nodes} />
{#if isToday}
	<Input />
{/if}
