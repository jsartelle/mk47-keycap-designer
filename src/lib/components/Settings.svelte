<script lang="ts">
	import { defaultSettings } from '$lib/stores/store'

	export let keyIndex: number | null = null
	const settings = defaultSettings // TODO use per-key overrides if keyIndex is set
</script>

<!-- TODO text alignment, casing, make smaller and able to be applied to per-key overrides with a popover -->

<fieldset class="grid">
	<legend>Fonts</legend>
	<label>
		<input type="text" bind:value={$settings.fontBase} placeholder="system-ui" />
		<span>Main</span>
	</label>
	<label>
		<input type="text" bind:value={$settings.fontLayer1} placeholder="system-ui" />
		<span>Layer 1</span>
	</label>
	<label>
		<input type="text" bind:value={$settings.fontLayer2} placeholder="system-ui" />
		<span>Layer 2</span>
	</label>
</fieldset>

<fieldset class="grid">
	<legend>Colors</legend>
	<label>
		<input type="color" bind:value={$settings.background} />
		<span>Background</span>
	</label>
	<label>
		<input type="color" bind:value={$settings.colorBase} />
		<span>Base Text</span>
	</label>
	<label>
		<input type="color" bind:value={$settings.colorLayer1} />
		<span>Layer 1 Text</span>
	</label>
	<label>
		<input type="color" bind:value={$settings.colorLayer2} />
		<span>Layer 2 Text</span>
	</label>
</fieldset>
