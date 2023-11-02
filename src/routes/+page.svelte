<script lang="ts">
	import { enhance } from "$app/forms";

	export let data;
</script>

<h1>Swift Spider</h1>
{#each data.todos as todo}
	<div class="item">
		<form use:enhance method="POST" action="?/complete">
			<input type="hidden" name="id" value={todo.id} />
			<button type="submit">•</button>
		</form>
		{todo.content}
	</div>
{/each}
<form use:enhance method="POST" action="?/new">
	<input name="content" />
</form>

<style>
	.item {
		display: flex;
	}
</style>
