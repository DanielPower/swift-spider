<script lang="ts">
	import { enhance } from "$app/forms";

	export let task: { id: number; content: string; status: "todo" | "done" };
	export let toggleAction: string;
	const symbol = task.status === "todo" ? "○" : "●";
	console.log(task);
</script>

<div class="task">
	<form method="POST" action={toggleAction}>
		<input type="hidden" name="id" value={task.id} />
		<input type="hidden" name="status" value={task.status} />
		<button type="submit">{symbol}</button>
	</form>
	{task.content}
</div>

<style>
	.task {
		display: flex;
	}
</style>
