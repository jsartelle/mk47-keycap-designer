<script lang="ts">
	import ResetButton from '$lib/components/ResetButton.svelte'
	import {
		globalKeySettings,
		type GlobalSettings,
		type ResettablePersistent,
	} from '$lib/stores/store'
	import { onDestroy } from 'svelte'

	export let option: keyof GlobalSettings
	export let keyStore: ResettablePersistent<Partial<GlobalSettings>> | null
	export let label: string

	let store: ResettablePersistent<any>
	$: store = keyStore ?? globalKeySettings

	let perKeyValue: Partial<GlobalSettings> | undefined
	$: if (keyStore) {
		const unsubscribe = keyStore.subscribe((value) => (perKeyValue = value))
		onDestroy(unsubscribe)
	}

	// we're not using two-way binding here because we want to fall back
	// to the global color if the per-key color isn't set
	let value: string
	$: value = perKeyValue?.[option] || $globalKeySettings[option]

	function updateValue(newValue: string) {
		$store[option] = newValue
	}

	let modified = false
	$: modified = $store[option] && $store[option] !== store.initialValue[option]

	function reset() {
		$store[option] = store.initialValue[option]
	}
</script>

<label>
	<!-- TODO allow dragging colors between inputs & keys -->
	<input type="color" {value} on:input={(e) => updateValue(e.currentTarget.value)} />
	<span>{label}</span>
	{#if modified}
		<ResetButton on:click={reset} label={`Reset ${label}`} />
	{/if}
</label>
