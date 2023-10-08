<script lang="ts">
	import SettingsColorInput from '$lib/components/SettingsColorInput.svelte'
	import SettingsInput from '$lib/components/SettingsInput.svelte'
	import { perKeySettings, type KeySettings } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'

	export let keyIndex: number | null = null

	let keyStore: ResettablePersistent<KeySettings> | null
	$: keyStore = keyIndex !== null ? perKeySettings.get(keyIndex)! : null

	function resetStyles() {
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
			value.sizeBase = initialValue.sizeBase
			value.sizeLayer1 = initialValue.sizeLayer1
			value.sizeLayer2 = initialValue.sizeLayer2
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
		<SettingsInput option="legendBase" {keyStore} iconPicker={true} on:iconPicker label="Legend" />
	{/if}
	<SettingsInput option="fontBase" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<SettingsInput
		option="sizeBase"
		range={true}
		{keyStore}
		label="Size"
		fallbackPlaceholder="system-ui"
	/>
	<!-- TODO look at https://github.com/untemps/svelte-palette?tab=readme-ov-file for a palette of currently used colors -->
	<SettingsColorInput option="background" {keyStore} label="Background" />
	<SettingsColorInput option="colorBase" {keyStore} label="Color" />
</fieldset>

<h3>Layer 1</h3>
<fieldset>
	{#if $keyStore}
		<SettingsInput
			option="legendLayer1"
			{keyStore}
			iconPicker={true}
			on:iconPicker
			label="Legend"
		/>
	{/if}
	<SettingsInput option="fontLayer1" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<SettingsInput
		option="sizeLayer1"
		range={true}
		{keyStore}
		label="Size"
		fallbackPlaceholder="system-ui"
	/>
	<SettingsColorInput option="colorLayer1" {keyStore} label="Color" />
</fieldset>

<h3>Layer 2</h3>
<fieldset>
	{#if $keyStore}
		<SettingsInput
			option="legendLayer2"
			{keyStore}
			iconPicker={true}
			on:iconPicker
			label="Legend"
		/>
	{/if}
	<SettingsInput option="fontLayer2" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<SettingsInput
		option="sizeLayer2"
		range={true}
		{keyStore}
		label="Size"
		fallbackPlaceholder="system-ui"
	/>
	<SettingsColorInput option="colorLayer2" {keyStore} label="Color" />
</fieldset>

{#if $keyStore}
	<h3>Reset</h3>
	<fieldset>
		<button class="inline contrast" on:click={resetStyles} data-tooltip="Fonts, sizes, and colors"
			>Reset Key Styles</button
		>
		<button class="inline contrast" on:click={resetLegends}>Reset Legends</button>
	</fieldset>
{/if}
