<script lang="ts">
	import ResetButton from '$lib/components/ResetButton.svelte'
	import { globalKeySettings, type KeySettings } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'

	export let option: keyof KeySettings
	export let keyStore: ResettablePersistent<KeySettings> | null
	export let label: string
	export let fallbackPlaceholder = ''

	let store: ResettablePersistent<any>
	$: store = keyStore ?? globalKeySettings

	let placeholder: string
	$: placeholder = ($globalKeySettings as any)[option] || fallbackPlaceholder

	let modified = false
	$: modified = $store[option] !== store.getInitialValue()[option]

	function reset() {
		$store[option] = store.getInitialValue()[option]
	}
</script>

<label>
	<!-- TODO popup icon picker -->
	<input type="text" bind:value={$store[option]} {placeholder} />
	<div class="field-title">
		<span>{label}</span>
		{#if modified}
			<ResetButton on:click={reset} label={`Reset ${label}`} />
		{/if}
	</div>
</label>
