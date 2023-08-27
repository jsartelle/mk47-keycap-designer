<script lang="ts">
	import Key from '$lib/components/Key.svelte'
	import { layout } from '$lib/stores/store'
</script>

<section class="keyboard">
	{#each $layout as key, index}
		<Key width={index === 41 ? 2 : 1}>
			<span>{key[0] ?? ''}</span>
			<span slot="layer1">{key[1] ?? ''}</span>
			<span slot="layer2">{key[2] ?? ''}</span>
		</Key>
	{/each}
</section>

<style>
	.keyboard {
		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(12, minmax(0, 1fr));
		gap: calc(var(--form-element-spacing-horizontal) / 2);
		font-size: 75%;
	}
</style>
