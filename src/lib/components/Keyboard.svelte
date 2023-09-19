<script lang="ts">
	import Key from '$lib/components/Key.svelte'
	import KeySettings from '$lib/components/KeySettings.svelte'
	import Popover from '$lib/components/Popover.svelte'
	import { caseColor, perKeySettings } from '$lib/stores/store'
	import { onMount, type ComponentEvents } from 'svelte'

	type KeyEvents = ComponentEvents<Key>

	let loading = true
	onMount(() => (loading = false))

	let keySettingsOpen = false
	let keySettingsIndex: number | null
	let keyTop: number
	let keyLeft: number
	let keyWidth: number

	async function openKeySettings(event: KeyEvents['click']) {
		keySettingsIndex = event.detail.index
		keyTop = event.detail.rect.bottom
		keyLeft = event.detail.rect.left
		keyWidth = event.detail.rect.width

		keySettingsOpen = true
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

<Popover
	bind:open={keySettingsOpen}
	top={keyTop}
	left={keyLeft + keyWidth / 2}
	on:close={() => (keySettingsIndex = null)}
>
	<KeySettings keyIndex={keySettingsIndex} />
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
