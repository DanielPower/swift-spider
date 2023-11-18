<script>
	import BlockList from "../../components/BlockList.svelte";

	export let data;
</script>

<BlockList nodes={data.nodes} />
