<script lang="ts">
	import type { Note } from "$lib/types";

	export let node: Note;
</script>

<div class="note">
	<div class="block-symbol">-</div>
	{node.content}
</div>

<style>
	.block-symbol {
		width: 1rem;
		text-align: center;
	}
	.note {
		display: flex;
	}
</style>
