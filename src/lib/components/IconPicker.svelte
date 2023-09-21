<script lang="ts">
	import * as imports from 'lucide-svelte'
	import { SvelteComponent, createEventDispatcher } from 'svelte'

	export let size = 24

	let query = ''

	const dispatch = createEventDispatcher<{
		icon: string
	}>()

	let icons: [string, any][]
	$: icons = Object.entries(imports).filter(([name, value]) => {
		return (
			name.toLowerCase().includes(query.toLowerCase()) &&
			!name.endsWith('Icon') &&
			!name.startsWith('Lucide') &&
			value.prototype instanceof SvelteComponent
		)
	})
</script>

<div class="search">
	<!-- svelte-ignore a11y-autofocus -->
	<input type="search" name="search" autofocus bind:value={query} placeholder="Search..." />
	{#if query}
		<button
			class="inline noexpand outline secondary"
			on:click={() => (query = '')}
			aria-label="Clear Search"
			title="Clear Search"
		>
			<svelte:component this={imports.XCircle} size={24} />
		</button>
	{/if}
</div>
<div class="icons">
	{#each icons as [name, icon] (name)}
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
	.search {
		position: sticky;
		top: 0;
		z-index: 1;
		padding-block: var(--spacing);
		display: flex;
		align-items: center;
	}

	.search input {
		margin: 0;
		padding-right: calc(var(--form-element-spacing-horizontal) * 2 + 24px);
	}

	.search button {
		position: absolute;
		right: var(--form-element-spacing-horizontal);
		border: none;
		padding: 0;
		margin: 0;
	}

	.icons {
		display: grid;
		grid-template-columns: repeat(5, auto);
		gap: calc(var(--spacing) / 2);
	}

	.icons button {
		aspect-ratio: 1 / 1;
		border: 0;
		padding: 0;
		margin: 0;

		&:hover {
			background-color: var(--secondary);
		}
	}
</style>
