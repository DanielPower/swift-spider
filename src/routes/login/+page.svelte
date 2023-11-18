<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<form method="POST">
	<select name="username">
		<option value="dan">Dan</option>
		<option value="nit">Nit</option>
	</select>
	<button type="submit">Login</button>
</form>

