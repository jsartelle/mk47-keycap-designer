<script lang="ts">
	import { defaultKeySettings, type KeySettings } from '$lib/stores/store'
	import { createEventDispatcher } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let index = 0
	export let settings: Writable<KeySettings>
	/** Unit width of the key (integer) */
	export let width = 1
	export let settingsOpen = false

	let key: HTMLButtonElement

	let label: string | undefined
	$: label =
		$settings.legendBase || $settings.legendLayer1 || $settings.legendLayer2 ? undefined : 'Blank'

	const dispatch = createEventDispatcher<{
		click: {
			index: number
			rect: DOMRect
		}
	}>()

	function dispatchClick() {
		dispatch('click', { index, rect: key.getBoundingClientRect() })
	}
</script>

<button
	bind:this={key}
	class="key"
	type="button"
	on:click={dispatchClick}
	aria-label={label}
	data-width={width}
	class:settings-open={settingsOpen}
	style:--width={width}
	style:--font-base={$settings.fontBase ?? $defaultKeySettings.fontBase}
	style:--font-layer1={$settings.fontLayer1 ?? $defaultKeySettings.fontLayer1}
	style:--font-layer2={$settings.fontLayer2 ?? $defaultKeySettings.fontLayer2}
	style:--background={$settings.background ?? $defaultKeySettings.background}
	style:--color-base={$settings.colorBase ?? $defaultKeySettings.colorBase}
	style:--color-layer1={$settings.colorLayer1 ?? $defaultKeySettings.colorLayer1}
	style:--color-layer2={$settings.colorLayer2 ?? $defaultKeySettings.colorLayer2}
>
	<div class="legend-base">{$settings.legendBase}</div>
	<div class="legend-layer1">{$settings.legendLayer1}</div>
	<div class="legend-layer2">{$settings.legendLayer2}</div>
</button>

<style lang="scss">
	.key {
		overflow: hidden;
		background: var(--background);
		border: none;
		border-radius: var(--border-radius);
		margin: 0;
		padding: 0.25rem;
		grid-column-end: span var(--width, 1);
		display: grid;
		align-items: stretch;
		grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
		font-size: inherit; // FIXME set font size
		text-align: inherit;
	}

	.key[data-width='1'] {
		aspect-ratio: 1 / 1;
	}

	.key.settings-open {
		box-shadow: 0 0 calc(var(--spacing) / 2) calc(var(--spacing) / 4)
			var(--form-element-border-color);
	}

	.key > * {
		white-space: nowrap;
		user-select: none;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.legend-base {
		grid-column-start: span 2;
		color: var(--color-base);
		font-family: var(--font-base), 'system-ui';
		font-size: 1.25em;
		justify-content: flex-start;
	}

	.legend-layer1 {
		color: var(--color-layer1);
		font-family: var(--font-layer1), 'system-ui';
	}

	.legend-layer2 {
		color: var(--color-layer2);
		font-family: var(--font-layer2), 'system-ui';
		text-align: right;
	}
</style>
