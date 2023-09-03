<script lang="ts">
	import { globalKeySettings, type KeySettings } from '$lib/stores/store'
	import type { Writable } from 'svelte/store'

	export let option: keyof KeySettings
	export let keyStore: Writable<KeySettings> | null
	export let label: string
	export let fallbackPlaceholder = ''

	let store: Writable<any>
	$: store = keyStore ?? globalKeySettings

	let placeholder: string
	$: placeholder = ($globalKeySettings as any)[option] || fallbackPlaceholder

	let existsOnGlobal: boolean
	$: existsOnGlobal = typeof ($globalKeySettings as any)[option] !== 'undefined'
</script>

<label class:modified={existsOnGlobal && $keyStore?.[option]}>
	<input type="text" bind:value={$store[option]} {placeholder} />
	<span>{label}</span>
</label>

<style lang="scss">
	.modified {
		font-weight: bold;
	}
</style>
