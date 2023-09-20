<script lang="ts">
	import IconPicker from '$lib/components/IconPicker.svelte'
	import Popover from '$lib/components/Popover.svelte'
	import ResetButton from '$lib/components/ResetButton.svelte'
	import { globalKeySettings, type KeySettings } from '$lib/stores/store'
	import type { ResettablePersistent } from '$lib/utils/ResettablePersistent'
	import { LayoutGrid } from 'lucide-svelte'

	export let option: keyof KeySettings
	export let keyStore: ResettablePersistent<KeySettings> | null
	export let iconPicker = false
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

	let iconPickerButton: HTMLButtonElement
	let iconPickerOpen = false
	let iconPickerTop: number
	let iconPickerCenterLeft: number

	function openIconPicker() {
		const rect = iconPickerButton.getBoundingClientRect()
		iconPickerTop = rect.bottom
		iconPickerCenterLeft = rect.left + rect.width / 2

		iconPickerOpen = true
	}
</script>

<label class:iconPicker>
	<input type="text" bind:value={$store[option]} {placeholder} />
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
			on:click={openIconPicker}
		>
			<LayoutGrid size={24} />
		</button>
	{/if}
</label>

<!-- FIXME fix close animation -->
<!-- FIXME make this a single instance like key settings popup -->
{#if iconPicker}
	<Popover bind:open={iconPickerOpen} top={iconPickerTop} centerLeft={iconPickerCenterLeft}>
		<IconPicker />
	</Popover>
{/if}

<style lang="scss">
	.iconPicker input {
		padding-right: calc(var(--form-element-spacing-horizontal) * 2 + 24px);
	}

	button {
		position: absolute;
		right: var(--form-element-spacing-horizontal);
		border: none;
		padding: 0;
		margin: 0;
	}
</style>
