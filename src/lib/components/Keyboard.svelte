<script lang="ts">
	import Key from '$lib/components/Key.svelte'
	import KeySettings from '$lib/components/KeySettings.svelte'
	import { keyboardBackground, perKeySettings } from '$lib/stores/store'
	import { tick, type ComponentEvents } from 'svelte'

	type KeyEvents = ComponentEvents<Key>

	let keySettingsDialog: HTMLDialogElement
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

		keySettingsDialog.showModal()
		await tick()
		keySettingsContainer.scrollTo(0, 0)
		keySettingsScroll()
	}

	function keySettingsScroll() {
		keySettingsOverflowTop = keySettingsDialog ? keySettingsContainer.scrollTop > 10 : false
		keySettingsOverflowBottom = keySettingsDialog
			? keySettingsContainer.scrollTop + keySettingsContainer.clientHeight <
			  keySettingsContainer.scrollHeight - 10
			: false
	}

	function closeKeySettings() {
		keySettingsDialog.close()
		keySettingsDialog.addEventListener('transitionend', () => (keySettingsIndex = null), {
			once: true,
		})
	}
</script>

<section class="keyboard" style:--background={$keyboardBackground}>
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

<dialog bind:this={keySettingsDialog}>
	<button class="close-dialog" on:click={closeKeySettings} aria-label="Close Key Settings" />
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
</dialog>

<style lang="scss">
	.keyboard {
		background: var(--background);
		border-radius: var(--border-radius);
		padding: calc(var(--spacing) / 2);
		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(12, minmax(0, 1fr));
		gap: calc(var(--spacing) / 2);
		font-size: 75%;
	}

	dialog {
		display: block;
		background: none;
		backdrop-filter: none;
		opacity: 0;
		transition: opacity 250ms ease;

		&:not([open]) {
			pointer-events: none;
		}

		&[open] {
			opacity: 1;
		}

		&::backdrop {
			background: none;
		}
	}

	.close-dialog {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		cursor: default;
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
		border: var(--border-width) solid var(--form-element-border-color);
		padding: var(--spacing);
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
		top: 0;
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
		transition: opacity 250ms ease;
	}

	.key-settings::after {
		--gradient-position: center 100%;
		top: auto;
		bottom: 0;
		transform: translate(calc(var(--spacing) * -1), var(--spacing));
	}

	.key-settings.overflow-top::before,
	.key-settings.overflow-bottom::after {
		opacity: 1;
	}
</style>
