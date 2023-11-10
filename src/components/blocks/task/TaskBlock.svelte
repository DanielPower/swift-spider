<script lang="ts">
	import { enhance } from "$app/forms";
	import type { Task } from "$lib/types";

	export let node: Task;
	$: blockSymbol = node.status === "todo" ? "○" : "●";
</script>

<div class="task">
	<form use:enhance method="POST" action="/?/toggle">
		<input type="hidden" name="id" value={node.id} />
		<input type="hidden" name="status" value={node.status} />
		<div class="block-symbol">
			<button type="submit">{blockSymbol}</button>
		</div>
	</form>
	{node.content}
</div>

<style>
	button {
		background: none;
		border: none;
	}
	.block-symbol {
		width: 1rem;
		text-align: center;
	}
	.task {
		display: flex;
	}
</style>
