<script lang="ts">
	import KeySettingsColorInput from '$lib/components/KeySettingsColorInput.svelte'
	import KeySettingsTextInput from '$lib/components/KeySettingsTextInput.svelte'
	import { perKeySettings, type KeySettings } from '$lib/stores/store'
	import type { Writable } from 'svelte/store'

	export let keyIndex: number | null = null

	let keyStore: Writable<KeySettings> | null
	$: keyStore = keyIndex ? perKeySettings.get(keyIndex)! : null
</script>

<!-- TODO add clear buttons for per-key settings -->

<fieldset class="settings-row">
	<legend>Base</legend>
	{#if $keyStore}
		<KeySettingsTextInput option="legendBase" {keyStore} label="Legend" />
	{/if}
	<KeySettingsTextInput option="fontBase" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<KeySettingsColorInput option="colorBase" {keyStore} label="Color" />
</fieldset>

<fieldset class="settings-row">
	<legend>Layer 1</legend>

	{#if $keyStore}
		<KeySettingsTextInput option="legendLayer1" {keyStore} label="Legend" />
	{/if}
	<KeySettingsTextInput
		option="fontLayer1"
		{keyStore}
		label="Font"
		fallbackPlaceholder="system-ui"
	/>
	<KeySettingsColorInput option="colorLayer1" {keyStore} label="Color" />
</fieldset>

<fieldset class="settings-row">
	<legend>Layer 2</legend>

	{#if $keyStore}
		<KeySettingsTextInput option="legendLayer2" {keyStore} label="Legend" />
	{/if}
	<KeySettingsTextInput
		option="fontLayer2"
		{keyStore}
		label="Font"
		fallbackPlaceholder="system-ui"
	/>
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
