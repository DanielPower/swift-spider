<script lang="ts">
	import type { Note } from "$lib/types";

	export let note: Note;
</script>

<div class="note">
	<div class="block-symbol">-</div>
	{note.content}
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
