<script lang="ts">
	import A from "../../components/A.svelte";
	import Button from "../../components/Button.svelte";
	import Input from "../../components/Input.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.status === "created"}
	<div class="info">Account created successfully. Please login.</div>
{:else if data.status === "bad_credentials"}
	<div class="error">Invalid username or password. Please try again.</div>
{/if}
<form method="POST">
	<div class="flex flex-col gap-2">
		<Input name="username" label="Username" />
		<Input name="password" label="Password" />
		<Button type="submit">Login</Button>
		<p>Don't have an account? <A href="/register">Register</A></p>
	</div>
</form>

<style>
	.info {
		background: green;
		border: solid 1px white;
		border-radius: 2px;
		color: white;
	}
	.error {
		background: red;
		border: solid 1px white;
		border-radius: 2px;
		color: white;
	}
</style>
