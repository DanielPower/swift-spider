<script lang="ts">
	import type { Note } from "$lib/types";

	export let note: Note;
</script>

<div class="note">
	<div class="block-symbol">
		<button type="submit">-</button>
	</div>
	{note.content}
</div>

<style>
	button {
		background: none;
		border: none;
	}
	.block-symbol {
		width: 1rem;
	}
	.note {
		display: flex;
	}
</style>
