<script>
	import BlockList from "../../components/BlockList.svelte";

	export let data;
	console.log(data.nodes);
</script>

<BlockList nodes={data.nodes} />
