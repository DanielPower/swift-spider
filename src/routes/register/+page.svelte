<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.status === "invalid_username"}
	<div class="error">Username must contain only alphanumeric characters.</div>
{:else if data.status === "username_taken"}
	<div class="error">Username already taken.</div>
{/if}
<form method="POST">
	<div>
		<label for="username">Username</label>
		<input name="username" />
	</div>
	<div>
		<label for="password">Password</label>
		<input name="password" />
	</div>
	<button type="submit">Register</button>
</form>

<style>
	.error {
		background: red;
		border: solid 1px white;
		border-radius: 2px;
		color: white;
	}
</style>
