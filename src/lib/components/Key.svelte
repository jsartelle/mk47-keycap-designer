<script lang="ts">
	import KeyLegend from '$lib/components/KeyLegend.svelte'
	import { globalKeySettings, type KeySettings, type ResettablePersistent } from '$lib/stores/store'
	import { createEventDispatcher, onMount } from 'svelte'

	export let index = 0
	export let settings: ResettablePersistent<KeySettings>
	/** Unit width of the key (integer) */
	export let width = 1
	export let settingsOpen = false

	let key: HTMLButtonElement
	let legendBase: HTMLDivElement
	let legendLayer1: HTMLDivElement
	let legendLayer2: HTMLDivElement

	let label: string | undefined
	$: label =
		$settings.legendBase || $settings.legendLayer1 || $settings.legendLayer2 ? undefined : 'Blank'

	let iconSizeBase: number
	let iconSizeLayer1: number
	let iconSizeLayer2: number

	function measureIconSizes() {
		iconSizeBase = parseInt(getComputedStyle(legendBase).fontSize)
		iconSizeLayer1 = parseInt(getComputedStyle(legendLayer1).fontSize)
		iconSizeLayer2 = parseInt(getComputedStyle(legendLayer2).fontSize)
	}
	onMount(measureIconSizes)

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

<svelte:window on:resize={measureIconSizes} />

<button
	bind:this={key}
	class="key"
	type="button"
	on:click={dispatchClick}
	aria-label={label}
	data-width={width}
	class:settings-open={settingsOpen}
	style:--width={width}
	style:--font-base={$settings.fontBase || $globalKeySettings.fontBase}
	style:--font-layer1={$settings.fontLayer1 || $globalKeySettings.fontLayer1}
	style:--font-layer2={$settings.fontLayer2 || $globalKeySettings.fontLayer2}
	style:--background={$settings.background || $globalKeySettings.background}
	style:--color-base={$settings.colorBase || $globalKeySettings.colorBase}
	style:--color-layer1={$settings.colorLayer1 || $globalKeySettings.colorLayer1}
	style:--color-layer2={$settings.colorLayer2 || $globalKeySettings.colorLayer2}
>
	<div class="legend-base" bind:this={legendBase}>
		<KeyLegend name={$settings.legendBase} size={iconSizeBase} />
	</div>
	<div class="legend-layer1" bind:this={legendLayer1}>
		<KeyLegend name={$settings.legendLayer1} size={iconSizeLayer1} />
	</div>
	<div class="legend-layer2" bind:this={legendLayer2}>
		<KeyLegend name={$settings.legendLayer2} size={iconSizeLayer2} />
	</div>
</button>

<style lang="scss">
	.key {
		overflow: hidden;
		background: var(--background);
		border: none;
		border-radius: var(--border-radius);
		margin: 0;
		padding: calc(10% / var(--width, 1));
		grid-column-end: span var(--width, 1);
		display: grid;
		align-items: stretch;
		grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
		text-align: inherit;
		container-type: size;
		transition: background var(--transition);
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
		font-size: 30cqh;
		line-height: 1;
		transition: color var(--transition);
	}

	.legend-base {
		grid-column-start: span 2;
		color: var(--color-base);
		font-family: var(--font-base);
		justify-content: flex-start;
		font-size: 50cqh;
	}

	.legend-layer1 {
		color: var(--color-layer1);
		font-family: var(--font-layer1);
	}

	.legend-layer2 {
		color: var(--color-layer2);
		font-family: var(--font-layer2);
		text-align: right;
	}
</style>
