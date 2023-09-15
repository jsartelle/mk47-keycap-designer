<script lang="ts">
	import ResetButton from '$lib/components/ResetButton.svelte'
	import { globalKeySettings, type KeySettings, type ResettablePersistent } from '$lib/stores/store'

	export let option: keyof KeySettings
	export let keyStore: ResettablePersistent<KeySettings> | null
	export let label: string
	export let fallbackPlaceholder = ''

	let store: ResettablePersistent<any>
	$: store = keyStore ?? globalKeySettings

	let placeholder: string
	$: placeholder = ($globalKeySettings as any)[option] || fallbackPlaceholder

	let modified = false
	$: modified = $store[option] !== store.initialValue[option]

	function reset() {
		$store[option] = store.initialValue[option]
	}
</script>

<label>
	<input type="text" bind:value={$store[option]} {placeholder} />
	<span>{label}</span>
	{#if modified}
		<ResetButton on:click={reset} label={`Reset ${label}`} />
	{/if}
</label>
