<script lang="ts">
	import { globalKeySettings, type GlobalSettings } from '$lib/stores/store'
	import { onDestroy } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let option: keyof GlobalSettings
	export let keyStore: Writable<Partial<GlobalSettings>> | null
	export let label: string

	let perKeyValue: Partial<GlobalSettings> | undefined
	$: if (keyStore) {
		const unsubscribe = keyStore.subscribe((value) => (perKeyValue = value))
		onDestroy(unsubscribe)
	}

	let value: string
	$: value = perKeyValue?.[option] || $globalKeySettings[option]

	function updateValue(newValue: string) {
		if (keyStore) {
			keyStore.update((value) => {
				value[option] = newValue
				return value
			})
		} else {
			$globalKeySettings[option] = newValue
		}
	}
</script>

<label class:modified={perKeyValue?.[option]}>
	<input type="color" {value} on:input={(e) => updateValue(e.currentTarget.value)} />
	<span>{label}</span>
</label>

<style lang="scss">
	.modified {
		font-weight: bold;
	}
</style>
