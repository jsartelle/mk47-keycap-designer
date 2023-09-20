<script lang="ts">
	import * as imports from 'lucide-svelte'
	import { SvelteComponent, createEventDispatcher } from 'svelte'

	export let size = 24

	// TODO add search

	const dispatch = createEventDispatcher<{
		icon: string
	}>()

	const icons: [string, any][] = Object.entries(imports).filter(([name, value]) => {
		return (
			!name.endsWith('Icon') &&
			!name.startsWith('Lucide') &&
			value.prototype instanceof SvelteComponent
		)
	})
</script>

<div>
	{#each icons as [name, icon]}
		<button
			class="inline noexpand outline contrast"
			on:click={() => dispatch('icon', name)}
			aria-label={name}
			title={name}
		>
			<svelte:component this={icon} {size} />
		</button>
	{/each}
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: repeat(5, auto);
		gap: calc(var(--spacing) / 2);
	}

	button {
		aspect-ratio: 1 / 1;
		border: 0;
		padding: 0;
		margin: 0;

		&:hover {
			background-color: var(--secondary);
		}
	}
</style>
