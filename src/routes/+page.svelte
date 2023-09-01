<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte'
	import KeySettings from '$lib/components/KeySettings.svelte'
	import { keyboardBackground } from '$lib/stores/store'
</script>

<main>
	<h1>tiny idiot board</h1>

	<Keyboard />

	<section>
		<h1>Global Settings</h1>

		<fieldset>
			<legend>Keyboard</legend>
			<label>
				<input type="color" bind:value={$keyboardBackground} />
				<span>Background</span>
			</label>
		</fieldset>

		<h2>Keys</h2>
		<KeySettings />
	</section>
</main>
