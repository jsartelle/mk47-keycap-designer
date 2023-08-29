<script lang="ts">
	import { defaultSettings, type KeySettings } from '$lib/stores/store'
	import type { Writable } from 'svelte/store'

	/** Unit width of the key (integer) */
	export let width = 1
	export let settings: Writable<KeySettings>
</script>

<div
	class="key"
	data-width={width}
	style:--width={width}
	style:--font-base={$settings.fontBase ?? $defaultSettings.fontBase}
	style:--font-layer1={$settings.fontLayer1 ?? $defaultSettings.fontLayer1}
	style:--font-layer2={$settings.fontLayer2 ?? $defaultSettings.fontLayer2}
	style:--background={$settings.background ?? $defaultSettings.background}
	style:--color-base={$settings.colorBase ?? $defaultSettings.colorBase}
	style:--color-layer1={$settings.colorLayer1 ?? $defaultSettings.colorLayer1}
	style:--color-layer2={$settings.colorLayer2 ?? $defaultSettings.colorLayer2}
>
	<div class="legend-base">{$settings.legendBase}</div>
	<div class="legend-layer1">{$settings.legendLayer1}</div>
	<div class="legend-layer2">{$settings.legendLayer2}</div>
</div>

<style lang="scss">
	.key {
		--background-dark: color-mix(in oklab, var(--background) 75%, black);
		--background-as-image: linear-gradient(to bottom, var(--background), var(--background));
		background: content-box var(--background-as-image), padding-box var(--background-dark);
		border: none;
		border-radius: var(--border-radius);
		margin: 0;
		padding: 0.25rem;
		grid-column-end: span var(--width, 1);
		display: grid;
		grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
	}

	.key[data-width='1'] {
		aspect-ratio: 1 / 1;
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
