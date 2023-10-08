<script lang="ts">
	/* TODO rename this component */
	import ResetButton from '$lib/components/ResetButton.svelte'
	import { globalKeySettings, type KeySettings } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'
	import { LayoutGrid } from 'lucide-svelte'
	import { createEventDispatcher } from 'svelte'

	export let option: keyof KeySettings
	export let range = false
	export let keyStore: ResettablePersistent<KeySettings> | null
	export let min = 0
	export let max = 100
	export let step = 5
	export let iconPicker = false
	export let label: string
	export let fallbackPlaceholder = ''

	const dispatch = createEventDispatcher<{
		iconPicker: {
			store: ResettablePersistent<KeySettings>
			option: keyof KeySettings
			rect: DOMRect
		}
	}>()

	let store: ResettablePersistent<any>
	$: store = keyStore ?? globalKeySettings

	let placeholder: string
	$: placeholder = ($globalKeySettings as any)[option] || fallbackPlaceholder

	let modified = false
	$: modified = $store[option] !== store.getInitialValue()[option]

	function reset() {
		$store[option] = store.getInitialValue()[option]
	}

	let iconPickerButton: HTMLButtonElement

	function dispatchIconPicker() {
		dispatch('iconPicker', {
			store: keyStore!,
			option,
			rect: iconPickerButton.getBoundingClientRect(),
		})
	}
</script>

<label class:iconPicker>
	{#if !range}
		<input type="text" bind:value={$store[option]} {placeholder} />
	{:else}
		<input
			type="range"
			bind:value={$store[option]}
			{min}
			{max}
			{step}
			{placeholder}
			inputmode="numeric"
		/>
	{/if}
	<div class="field-title">
		<span>{label}</span>
		{#if modified}
			<ResetButton on:click={reset} label={`Reset ${label}`} />
		{/if}
	</div>
	{#if iconPicker}
		<button
			bind:this={iconPickerButton}
			class="inline noexpand outline secondary"
			on:click={dispatchIconPicker}
			aria-label="Choose Icon"
			title="Choose Icon"
		>
			<LayoutGrid size={24} />
		</button>
	{/if}
</label>

<style lang="scss">
	.iconPicker input {
		padding-right: calc(var(--form-element-spacing-horizontal) * 2 + 24px);
	}

	input[type='range'] + .field-title {
		left: 0;
		background: none;

		@container (max-width: 300px) {
			transform: none;
		}
	}

	button {
		position: absolute;
		right: var(--form-element-spacing-horizontal);
		border: none;
		padding: 0;
		margin: 0;
	}
</style>
