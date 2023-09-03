<script lang="ts">
	import KeySettingsColorInput from '$lib/components/KeySettingsColorInput.svelte'
	import { globalKeySettings, perKeySettings, type KeySettings } from '$lib/stores/store'
	import type { Writable } from 'svelte/store'

	export let keyIndex: number | null = null

	let store: Writable<any>
	$: store = keyIndex ? perKeySettings.get(keyIndex!)! : globalKeySettings

	let keyStore: Writable<KeySettings> | null
	$: keyStore = keyIndex ? perKeySettings.get(keyIndex)! : null
</script>

<!-- TODO add clear buttons for per-key settings -->

<fieldset class="settings-row">
	<legend>Base</legend>
	{#if $keyStore}
		<label>
			<input type="text" bind:value={$keyStore.legendBase} />
			<span>Base Legend</span>
		</label>
	{/if}
	<label class:modified={$keyStore?.fontBase}>
		<input
			type="text"
			bind:value={$store.fontBase}
			placeholder={$globalKeySettings.fontBase || 'system-ui'}
		/>
		<span>Font</span>
	</label>
	<KeySettingsColorInput option="background" {keyStore} label="Background" />
	<KeySettingsColorInput option="colorBase" {keyStore} label="Color" />
</fieldset>

<fieldset class="settings-row">
	<legend>Layer 1</legend>

	{#if $keyStore}
		<label>
			<input type="text" bind:value={$keyStore.legendLayer1} />
			<span>Legend</span>
		</label>
	{/if}
	<label class:modified={$keyStore?.fontLayer1}>
		<input
			type="text"
			bind:value={$store.fontLayer1}
			placeholder={$globalKeySettings.fontLayer1 || 'system-ui'}
		/>
		<span>Font</span>
	</label>
	<KeySettingsColorInput option="colorLayer1" {keyStore} label="Color" />
</fieldset>

<fieldset class="settings-row">
	<legend>Layer 2</legend>

	{#if $keyStore}
		<label>
			<input type="text" bind:value={$keyStore.legendLayer2} />
			<span>Legend</span>
		</label>
	{/if}
	<label class:modified={$keyStore?.fontLayer2}>
		<input
			type="text"
			bind:value={$store.fontLayer2}
			placeholder={$globalKeySettings.fontLayer2 || 'system-ui'}
		/>
		<span>Font</span>
	</label>
	<KeySettingsColorInput option="colorLayer2" {keyStore} label="Color" />
</fieldset>

<style lang="scss">
	.settings-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing);
	}
	.modified {
		font-weight: bold;
	}
</style>
