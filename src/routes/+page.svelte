<script lang="ts">
	import KeySettings from '$lib/components/KeySettings.svelte'
	import Keyboard from '$lib/components/Keyboard.svelte'
	import ResetButton from '$lib/components/ResetButton.svelte'
	import { caseColor, globalKeySettings, perKeySettings } from '$lib/stores/store'

	function resetGlobalSettings() {
		if (confirm('Reset all global settings?')) {
			caseColor.reset()
			globalKeySettings.reset()
		}
	}

	function resetKeyColorsFonts() {
		if (confirm('Reset all key colors and fonts?')) {
			perKeySettings.forEach((store) =>
				store.update((value) => {
					value.colorBase = store.initialValue.colorBase
					value.colorLayer1 = store.initialValue.colorLayer1
					value.colorLayer2 = store.initialValue.colorLayer2
					value.fontBase = store.initialValue.fontBase
					value.fontLayer1 = store.initialValue.fontLayer1
					value.fontLayer2 = store.initialValue.fontLayer2
					return value
				}),
			)
		}
	}

	function resetKeyLegends() {
		if (confirm('Reset all key legends?')) {
			perKeySettings.forEach((store) =>
				store.update((value) => {
					value.legendBase = store.initialValue.legendBase
					value.legendLayer1 = store.initialValue.legendLayer1
					value.legendLayer2 = store.initialValue.legendLayer2
					return value
				}),
			)
		}
	}
</script>

<main>
	<h1>tiny idiot board</h1>

	<Keyboard />

	<section>
		<h1>Global Settings</h1>

		<fieldset>
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

		<h2>Reset</h2>
		<fieldset>
			<button class="inline" on:click={resetGlobalSettings}>Reset Global Settings</button>
			<button class="inline" on:click={resetKeyColorsFonts}>Reset Key Colors & Fonts</button>
			<button class="inline" on:click={resetKeyLegends}>Reset Key Legends</button>
		</fieldset>
	</section>
</main>
