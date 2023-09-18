<script lang="ts">
	import { RotateCcw } from 'lucide-svelte'

	export let label: string
</script>

<button class="inline noexpand outline secondary" on:click aria-label={label} title={label}>
	<RotateCcw />
</button>

<style lang="scss">
	button {
		border: none;
		height: 100%;
		padding: 0;
		margin: 0;
	}
</style>
