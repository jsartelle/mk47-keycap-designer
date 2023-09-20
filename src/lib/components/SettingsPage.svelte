<script lang="ts">
	import SettingsColorInput from '$lib/components/SettingsColorInput.svelte'
	import SettingsTextInput from '$lib/components/SettingsTextInput.svelte'
	import { perKeySettings, type KeySettings } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'

	export let keyIndex: number | null = null

	let keyStore: ResettablePersistent<KeySettings> | null
	$: keyStore = keyIndex !== null ? perKeySettings.get(keyIndex)! : null

	function resetColorsFonts() {
		if (!keyStore) return
		keyStore.update((value) => {
			const initialValue = keyStore!.getInitialValue()
			value.background = initialValue.background
			value.colorBase = initialValue.colorBase
			value.colorLayer1 = initialValue.colorLayer1
			value.colorLayer2 = initialValue.colorLayer2
			value.fontBase = initialValue.fontBase
			value.fontLayer1 = initialValue.fontLayer1
			value.fontLayer2 = initialValue.fontLayer2
			return value
		})
	}

	function resetLegends() {
		if (!keyStore) return
		keyStore.update((value) => {
			const initialValue = keyStore!.getInitialValue()
			value.legendBase = initialValue.legendBase
			value.legendLayer1 = initialValue.legendLayer1
			value.legendLayer2 = initialValue.legendLayer2
			return value
		})
	}
</script>

<h3>Base</h3>
<fieldset>
	{#if $keyStore}
		<SettingsTextInput
			option="legendBase"
			{keyStore}
			iconPicker={true}
			on:iconPicker
			label="Legend"
		/>
	{/if}
	<!-- TODO disable if Lucide icon is being used -->
	<SettingsTextInput option="fontBase" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<!-- TODO look at https://github.com/untemps/svelte-palette?tab=readme-ov-file for a palette of currently used colors -->
	<SettingsColorInput option="background" {keyStore} label="Background" />
	<SettingsColorInput option="colorBase" {keyStore} label="Color" />
</fieldset>

<h3>Layer 1</h3>
<fieldset>
	{#if $keyStore}
		<SettingsTextInput
			option="legendLayer1"
			{keyStore}
			iconPicker={true}
			on:iconPicker
			label="Legend"
		/>
	{/if}
	<SettingsTextInput option="fontLayer1" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<SettingsColorInput option="colorLayer1" {keyStore} label="Color" />
</fieldset>

<h3>Layer 2</h3>
<fieldset>
	{#if $keyStore}
		<SettingsTextInput
			option="legendLayer2"
			{keyStore}
			iconPicker={true}
			on:iconPicker
			label="Legend"
		/>
	{/if}
	<SettingsTextInput option="fontLayer2" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<SettingsColorInput option="colorLayer2" {keyStore} label="Color" />
</fieldset>

{#if $keyStore}
	<h3>Reset</h3>
	<fieldset>
		<button class="inline contrast" on:click={resetColorsFonts}>Reset Colors & Fonts</button>
		<button class="inline contrast" on:click={resetLegends}>Reset Legends</button>
	</fieldset>
{/if}
