<script lang="ts">
	import Key from '$lib/components/Key.svelte'
	import KeySettings from '$lib/components/KeySettings.svelte'
	import { keyboardBackground, perKeySettings } from '$lib/stores/store'
</script>

<section class="keyboard" style:--background={$keyboardBackground}>
	{#each perKeySettings as [index, key]}
		<Key settings={key} width={index === 41 ? 2 : 1} />
	{/each}
</section>

<style lang="scss">
	.keyboard {
		background: var(--background);
		border-radius: var(--border-radius);
		padding:  calc(var(--spacing) / 2);
		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(12, minmax(0, 1fr));
		gap: calc(var(--spacing) / 2);
		font-size: 75%;
	}
</style>
