<script lang="ts">
	import { defaultSettings } from '$lib/stores/settings'

	/** Unit width of the key (integer) */
	export let width = 1
</script>

<div
	class="key"
	style:--width={width}
	style:--font-base={$defaultSettings.fontBase}
	style:--font-layer1={$defaultSettings.fontLayer1}
	style:--font-layer2={$defaultSettings.fontLayer2}
	style:--background={$defaultSettings.background}
	style:--color-base={$defaultSettings.colorBase}
	style:--color-layer1={$defaultSettings.colorLayer1}
	style:--color-layer2={$defaultSettings.colorLayer2}
>
	<slot><span /></slot>
	<slot name="layer1"><span /></slot>
	<slot name="layer2"><span /></slot>
</div>

<style lang="scss">
	.key {
		--background-dark: color-mix(in oklab, var(--background) 75%, black);
		--background-as-image: linear-gradient(to bottom, var(--background), var(--background));
		background: content-box var(--background-as-image), padding-box var(--background-dark);
		border: 1px solid var(--background-color);
		border-radius: var(--border-radius);
		padding: 0.25rem;
		aspect-ratio: var(--width) / 1;
		grid-column-end: span var(--width, 1);
		display: grid;
		grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
	}

	:global(.key > *) {
		white-space: nowrap;
		user-select: none;
	}

	:global(.key > :nth-child(1)) {
		grid-column-start: span 2;
		color: var(--color-base);
		font-family: var(--font-base), 'system-ui';
		text-align: center;
	}

	:global(.key > :nth-child(2)) {
		color: var(--color-layer1);
		font-family: var(--font-layer1), 'system-ui';
	}

	:global(.key > :nth-child(3)) {
		color: var(--color-layer2);
		font-family: var(--font-layer2), 'system-ui';
		text-align: right;
	}
</style>
