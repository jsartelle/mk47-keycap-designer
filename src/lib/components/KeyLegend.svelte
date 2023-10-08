<script lang="ts">
	import * as icons from 'lucide-svelte'
	export let text: string
	export let size = 30
</script>

<span style:--size={`${size}cqh`}>
	{#if text.startsWith('lucide:')}
		<svelte:component this={icons[text.replace('lucide:', '')]} {...$$props} />
	{:else}
		{text}
	{/if}
</span>

<style lang="scss">
	span {
		font-size: var(--size);
	}

	span :global(svg) {
		width: var(--size) !important;
		height: var(--size) !important;
	}
</style>
