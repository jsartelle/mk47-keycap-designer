<script lang="ts">
	import * as icons from 'lucide-svelte'
	export let name: string
</script>

{#if name.startsWith('lucide:')}
	<!-- FIXME need to fix font size on icons -->
	<svelte:component this={icons[name.replace('lucide:', '')]} {...$$props} />
{:else}
	{name}
{/if}
