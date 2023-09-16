<script lang="ts">
	import * as icons from 'lucide-svelte'
	export let name: string
	export let size: number
</script>

{#if name.startsWith('lucide:')}
	<svelte:component this={icons[name.replace('lucide:', '')]} {size} {...$$props} />
{:else}
	{name}
{/if}
