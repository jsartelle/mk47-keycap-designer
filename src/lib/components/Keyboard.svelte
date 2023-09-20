<script lang="ts">
	import IconPicker from '$lib/components/IconPicker.svelte'
	import Key from '$lib/components/Key.svelte'
	import KeySettings from '$lib/components/KeySettings.svelte'
	import Popover from '$lib/components/Popover.svelte'
	import { caseColor, perKeySettings, type KeySettings as KeySettingsType } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'
	import { onMount, type ComponentEvents } from 'svelte'

	type KeyEvents = ComponentEvents<Key>
	type KeySettingsEvents = ComponentEvents<KeySettings>
	type IconPickerEvents = ComponentEvents<IconPicker>

	let loading = true
	onMount(() => (loading = false))

	let keySettingsOpen = false
	// TODO pass up store instead, like iconPicker?
	let keySettingsIndex: number | null
	let keyTop: number
	let keyCenterLeft: number

	$: if (!keySettingsOpen) keySettingsIndex = null

	let iconPickerStore: ResettablePersistent<KeySettingsType>
	let iconPickerOption: keyof KeySettingsType
	let iconPickerOpen = false
	let iconPickerTop: number
	let iconPickerCenterLeft: number

	// TODO instead of handing events up the chain, pass these down through context?
	async function openKeySettings(event: KeyEvents['click']) {
		keySettingsIndex = event.detail.index
		keyTop = event.detail.rect.bottom
		keyCenterLeft = event.detail.rect.left + event.detail.rect.width / 2

		keySettingsOpen = true
	}

	function openIconPicker(event: KeySettingsEvents['iconPicker']) {
		iconPickerStore = event.detail.store
		iconPickerOption = event.detail.option
		iconPickerTop = event.detail.rect.bottom
		iconPickerCenterLeft = event.detail.rect.left + event.detail.rect.width / 2

		iconPickerOpen = true
	}

	function iconSelected(event: IconPickerEvents['icon']) {
		console.log(event.detail)
		$iconPickerStore[iconPickerOption] = `lucide:${event.detail}`
		iconPickerOpen = false
	}
</script>

<section class="keyboard" class:loading style:--background={$caseColor}>
	{#each perKeySettings as [index, key]}
		<Key
			{index}
			settings={key}
			width={index === 41 ? 2 : 1}
			settingsOpen={index === keySettingsIndex}
			on:click={openKeySettings}
		/>
	{/each}
</section>

<Popover bind:open={keySettingsOpen} top={keyTop} centerLeft={keyCenterLeft}>
	<KeySettings keyIndex={keySettingsIndex} on:iconPicker={openIconPicker} />
</Popover>

<!-- FIXME fix z-index on close animation -->
<Popover bind:open={iconPickerOpen} top={iconPickerTop} centerLeft={iconPickerCenterLeft}>
	<IconPicker on:icon={iconSelected} />
</Popover>

<style lang="scss">
	.keyboard {
		background: var(--background);
		border-radius: var(--border-radius);
		padding: var(--spacing-small);
		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(12, minmax(0, 1fr));
		gap: var(--spacing-small);
		font-size: 75%;
		transition: filter var(--transition);
	}

	.keyboard.loading {
		filter: blur(0.5rem);
	}
</style>
