<script lang="ts">
	import Key from '$lib/components/Key.svelte'
	import KeySettings from '$lib/components/KeySettings.svelte'
	import { keyboardBackground, perKeySettings } from '$lib/stores/store'
	import type { ComponentEvents } from 'svelte'

	type KeyEvents = ComponentEvents<Key>

	let keySettingsPopup: HTMLDialogElement
	let keySettingsIndex: number
	let keyTop: string
	let keyLeft: string
	let keyWidth: string

	function openKeySettings(event: KeyEvents['click']) {
		keySettingsIndex = event.detail.index
		keyTop = event.detail.rect.bottom + 'px'
		keyLeft = event.detail.rect.left + 'px'
		keyWidth = event.detail.rect.width + 'px'

		keySettingsPopup.showModal()
	}

	function closeKeySettings() {
		keySettingsPopup.close()
	}
</script>

<section class="keyboard" style:--background={$keyboardBackground}>
	{#each perKeySettings as [index, key]}
		<Key {index} settings={key} width={index === 41 ? 2 : 1} on:click={openKeySettings} />
	{/each}
</section>

<dialog bind:this={keySettingsPopup}>
	<button class="close-dialog" on:click={closeKeySettings} aria-label="Close Key Settings" />
	<div
		class="key-settings"
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
		background: none;
		backdrop-filter: none;

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
		resize: horizontal;
		container-type: inline-size;
	}
</style>
