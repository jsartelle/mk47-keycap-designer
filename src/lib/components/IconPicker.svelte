<script lang="ts">
	import * as imports from 'lucide-svelte'
	import { SvelteComponent } from 'svelte'

	const icons = Object.entries(imports).filter(([name, value]) => {
		return (
			!name.endsWith('Icon') &&
			!name.startsWith('Lucide') &&
			value.prototype instanceof SvelteComponent
		)
	})
</script>

<div>
	{#each icons as [_, icon]}
		<svelte:component this={icon} size={24} />
	{/each}
</div>
