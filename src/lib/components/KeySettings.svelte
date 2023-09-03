<script lang="ts">
	import { defaultKeySettings, perKeySettings, type KeySettings } from '$lib/stores/store'
	import type { Writable } from 'svelte/store'

	export let keyIndex: number | null = null

	let store: Writable<KeySettings>
	$: store = keyIndex
		? perKeySettings.get(keyIndex!)!
		: (defaultKeySettings as Writable<KeySettings>) // hack because you can't cast inside the markup, so without this $store.legendBase isn't type-safe even inside the #if block
</script>

<!-- FIXME get per-key settings to show the default settings if not set -->
<!-- TODO add clear buttons for per-key settings -->

<fieldset class="settings-row">
	<legend>Base</legend>
	{#if keyIndex !== null}
		<label>
			<input type="text" bind:value={$store.legendBase} />
			<span>Base Legend</span>
		</label>
	{/if}
	<label>
		<input
			type="text"
			bind:value={$store.fontBase}
			placeholder={$defaultKeySettings.fontBase || 'system-ui'}
		/>
		<span>Font</span>
	</label>
	<label>
		<input type="color" bind:value={$store.background} />
		<span>Background</span>
	</label>
	<label>
		<input type="color" bind:value={$store.colorBase} />
		<span>Color</span>
	</label>
</fieldset>

<fieldset class="settings-row">
	<legend>Layer 1</legend>

	{#if keyIndex !== null}
		<label>
			<input type="text" bind:value={$store.legendLayer1} />
			<span>Legend</span>
		</label>
	{/if}
	<label>
		<input
			type="text"
			bind:value={$store.fontLayer1}
			placeholder={$defaultKeySettings.fontLayer1 || 'system-ui'}
		/>
		<span>Font</span>
	</label>
	<label>
		<input type="color" bind:value={$store.colorLayer1} />
		<span>Color</span>
	</label>
</fieldset>

<fieldset class="settings-row">
	<legend>Layer 2</legend>

	{#if keyIndex !== null}
		<label>
			<input type="text" bind:value={$store.legendLayer2} />
			<span>Legend</span>
		</label>
	{/if}
	<label>
		<input
			type="text"
			bind:value={$store.fontLayer2}
			placeholder={$defaultKeySettings.fontLayer2 || 'system-ui'}
		/>
		<span>Font</span>
	</label>
	<label>
		<input type="color" bind:value={$store.colorLayer2} />
		<span>Color</span>
	</label>
</fieldset>

<style lang="scss">
	.settings-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing);
	}
</style>
