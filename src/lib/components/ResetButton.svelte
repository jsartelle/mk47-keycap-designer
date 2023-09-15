<script lang="ts">
	import { RotateCcw } from 'lucide-svelte'

	export let label: string
</script>

<button class="inline outline secondary" on:click aria-label={label}>
	<RotateCcw />
</button>

<style lang="scss">
	button {
		border: none;
		padding-inline: 0;
		margin: 0;
	}
</style>
