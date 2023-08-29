<script lang="ts">
	import Key from '$lib/components/Key.svelte'
	import { perKeySettings } from '$lib/stores/store'
</script>

<section class="keyboard">
	{#each perKeySettings as [index, key]}
		<Key settings={key} width={index === 41 ? 2 : 1} />
	{/each}
</section>

<style>
	.keyboard {
		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(12, minmax(0, 1fr));
		gap: calc(var(--spacing) / 2);
		font-size: 75%;
	}
</style>
