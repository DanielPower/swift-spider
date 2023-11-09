<script lang="ts">
	import { enhance } from "$app/forms";
	import type { Task } from "$lib/types";

	export let task: Task;
	$: blockSymbol = task.status === "todo" ? "○" : "●";
</script>

<div class="task">
	<form use:enhance method="POST" action="/?/toggle">
		<input type="hidden" name="id" value={task.id} />
		<input type="hidden" name="status" value={task.status} />
		<div class="block-symbol">
			<button type="submit">{blockSymbol}</button>
		</div>
	</form>
	{task.content}
</div>

<style>
	button {
		background: none;
		border: none;
	}
	.block-symbol {
		width: 1rem;
		text-align: center;
		margin-right: 1rem;
	}
	.task {
		display: flex;
	}
</style>
