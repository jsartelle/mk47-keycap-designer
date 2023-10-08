<script lang="ts">
	import KeyLegend from '$lib/components/KeyLegend.svelte'
	import { globalKeySettings, hideLegends, type KeySettings } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'
	import { createEventDispatcher } from 'svelte'

	export let index = 0
	export let settings: ResettablePersistent<KeySettings>
	/** Unit width of the key (integer) */
	export let width = 1
	export let settingsOpen = false

	const dispatch = createEventDispatcher<{
		click: {
			index: number
			rect: DOMRect
		}
	}>()

	let key: HTMLButtonElement

	let label: string | undefined
	$: label =
		$settings.legendBase || $settings.legendLayer1 || $settings.legendLayer2 ? undefined : 'Blank'

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
	class:settingsOpen
	class:hideLegends={$hideLegends}
	style:--width={width}
	style:--font-base={$settings.fontBase || $globalKeySettings.fontBase}
	style:--font-layer1={$settings.fontLayer1 || $globalKeySettings.fontLayer1}
	style:--font-layer2={$settings.fontLayer2 || $globalKeySettings.fontLayer2}
	style:--background={$settings.background || $globalKeySettings.background}
	style:--color-base={$settings.colorBase || $globalKeySettings.colorBase}
	style:--color-layer1={$settings.colorLayer1 || $globalKeySettings.colorLayer1}
	style:--color-layer2={$settings.colorLayer2 || $globalKeySettings.colorLayer2}
>
	<div class="legend-base">
		<KeyLegend
			text={$settings.legendBase}
			size={$settings.sizeBase || $globalKeySettings.sizeBase}
		/>
	</div>
	<div class="legend-layer1">
		<KeyLegend
			text={$settings.legendLayer1}
			size={$settings.sizeLayer1 || $globalKeySettings.sizeLayer1}
		/>
	</div>
	<div class="legend-layer2">
		<KeyLegend
			text={$settings.legendLayer2}
			size={$settings.sizeLayer2 || $globalKeySettings.sizeLayer2}
		/>
	</div>
</button>

<style lang="scss">
	.key {
		overflow: hidden;
		background: var(--background);
		border: none;
		border-radius: 0.25rem;
		margin: 0;
		padding: calc(10% / var(--width, 1));
		grid-column-end: span var(--width, 1);
		display: grid;
		align-items: stretch;
		grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
		text-align: inherit;
		container-type: size;
		transition: none;
	}

	.key[data-width='1'] {
		aspect-ratio: 1 / 1;
	}

	.key.settingsOpen {
		box-shadow: 0 0 calc(var(--spacing) / 2) calc(var(--spacing) / 4)
			var(--form-element-border-color);
	}

	.key > * {
		white-space: nowrap;
		user-select: none;
		line-height: 1;
		transition: opacity var(--transition);
	}

	.key.hideLegends > * {
		opacity: 0;
	}

	.key > :not(.legend-base) {
		align-self: end;
	}

	.legend-base {
		grid-column-start: span 2;
		color: var(--color-base);
		font-family: var(--font-base);
		justify-content: flex-start;
	}

	.legend-layer1 {
		color: var(--color-layer1);
		font-family: var(--font-layer1);
	}

	.legend-layer2 {
		color: var(--color-layer2);
		font-family: var(--font-layer2);
		align-items: flex-end;
		text-align: right;
	}
</style>
