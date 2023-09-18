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
	let keySettingsContainer: HTMLDivElement
	let keySettingsIndex: number | null
	let keyTop: string
	let keyLeft: string
	let keyWidth: string
	let keySettingsOverflowTop: boolean
	let keySettingsOverflowBottom: boolean

	async function openKeySettings(event: KeyEvents['click']) {
		keySettingsIndex = event.detail.index
		keyTop = event.detail.rect.bottom + 'px'
		keyLeft = event.detail.rect.left + 'px'
		keyWidth = event.detail.rect.width + 'px'

		keySettingsOpen = true
		keySettingsContainer.scrollTo(0, 0)
		keySettingsScroll()
	}

	function keySettingsScroll() {
		keySettingsOverflowTop = keySettingsOpen ? keySettingsContainer.scrollTop > 10 : false
		keySettingsOverflowBottom = keySettingsOpen
			? keySettingsContainer.scrollTop + keySettingsContainer.clientHeight <
			  keySettingsContainer.scrollHeight - 10
			: false
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

<Popover bind:open={keySettingsOpen} on:close={() => (keySettingsIndex = null)}>
	<div
		bind:this={keySettingsContainer}
		class="key-settings"
		on:scroll={keySettingsScroll}
		class:overflow-top={keySettingsOverflowTop}
		class:overflow-bottom={keySettingsOverflowBottom}
		style:--key-top={keyTop}
		style:--key-left={keyLeft}
		style:--key-width={keyWidth}
	>
		<KeySettings keyIndex={keySettingsIndex} />
	</div>
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

	.key-settings {
		--width: 300px;
		position: fixed;
		top: var(--key-top);
		left: clamp(
			var(--spacing),
			calc(var(--key-left) - var(--width) / 2 + var(--key-width) / 2),
			100vw - var(--width) - var(--spacing)
		);
		background: var(--background-color);
		box-shadow: 0 0 calc(var(--spacing) / 2) var(--form-element-border-color);
		border: var(--border-width) solid var(--form-element-border-color);
		padding: 0 var(--spacing);
		width: var(--width);
		max-height: calc(100vh - var(--key-top) - var(--spacing));
		border-radius: var(--border-radius);
		overflow: hidden scroll;
		overscroll-behavior: none;
		container-type: inline-size;
	}

	.key-settings::before,
	.key-settings::after {
		--gradient-position: center 0;
		content: '';
		display: block;
		position: sticky;
		z-index: 1;
		top: var(--spacing);
		left: 0;
		transform: translate(calc(var(--spacing) * -1), calc(var(--spacing) * -1));
		height: var(--spacing);
		width: inherit;
		background: radial-gradient(
			75% 100% at var(--gradient-position),
			var(--form-element-border-color),
			transparent
		);
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--transition);
	}

	.key-settings::after {
		--gradient-position: center 100%;
		top: auto;
		bottom: var(--spacing);
		transform: translate(calc(var(--spacing) * -1), var(--spacing));
	}

	.key-settings.overflow-top::before,
	.key-settings.overflow-bottom::after {
		opacity: 1;
	}
</style>
