<script lang="ts">
	import KeySettings from '$lib/components/KeySettings.svelte'
	import Keyboard from '$lib/components/Keyboard.svelte'
	import ResetButton from '$lib/components/ResetButton.svelte'
	import { caseColor } from '$lib/stores/store'
</script>

<main>
	<h1>tiny idiot board</h1>

	<Keyboard />

	<section>
		<h1>Global Settings</h1>

		<fieldset class="settings-row">
			<legend>Keyboard</legend>
			<label>
				<input type="color" bind:value={$caseColor} />
				<span>Case Color</span>
				{#if $caseColor !== caseColor.initialValue}
					<ResetButton on:click={caseColor.reset} />
				{/if}
			</label>
		</fieldset>

		<h2>Keys</h2>
		<KeySettings />

		<!-- TODO add global reset buttons -->
	</section>
</main>
