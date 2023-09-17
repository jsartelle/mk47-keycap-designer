<script lang="ts">
	import KeySettingsColorInput from '$lib/components/KeySettingsColorInput.svelte'
	import KeySettingsTextInput from '$lib/components/KeySettingsTextInput.svelte'
	import { perKeySettings, type KeySettings, type ResettablePersistent } from '$lib/stores/store'

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
		<KeySettingsTextInput option="legendBase" {keyStore} label="Legend" />
	{/if}
	<!-- TODO disable if Lucide icon is being used -->
	<KeySettingsTextInput option="fontBase" {keyStore} label="Font" fallbackPlaceholder="system-ui" />
	<KeySettingsColorInput option="background" {keyStore} label="Background" />
	<KeySettingsColorInput option="colorBase" {keyStore} label="Color" />
</fieldset>

<h3>Layer 1</h3>
<fieldset>
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

<h3>Layer 2</h3>
<fieldset>
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

{#if $keyStore}
	<h3>Reset</h3>
	<fieldset>
		<button class="inline contrast" on:click={resetColorsFonts}>Reset Colors & Fonts</button>
		<button class="inline contrast" on:click={resetLegends}>Reset Legends</button>
	</fieldset>
{/if}
