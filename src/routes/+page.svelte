<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte'
	import {
		background,
		colorBase,
		colorLayer1,
		colorLayer2,
		fontBase,
		fontLayer1,
		fontLayer2
	} from '$lib/stores/settings'
</script>

<h1>tiny idiot board</h1>

<main>
	<Keyboard />

	<section class="options">
		<h1>Options</h1>

		<fieldset>
			<legend>Default</legend>
			<div class="fonts">
				<label>
					<span>Main</span>
					<input type="text" bind:value={$fontBase} placeholder="system-ui" />
				</label>
				<label>
					<span>Layer 1</span>
					<input type="text" bind:value={$fontLayer1} placeholder="system-ui" />
				</label>
				<label>
					<span>Layer 2</span>
					<input type="text" bind:value={$fontLayer2} placeholder="system-ui" />
				</label>
			</div>
			<div class="colors">
				<label>
					<input type="color" bind:value={$background} />
					<span>Background</span>
				</label>
				<label>
					<input type="color" bind:value={$colorBase} />
					<span>Base Text</span>
				</label>
				<label>
					<input type="color" bind:value={$colorLayer1} />
					<span>Layer 1 Text</span>
				</label>
				<label>
					<input type="color" bind:value={$colorLayer2} />
					<span>Layer 2 Text</span>
				</label>
			</div>
		</fieldset>
	</section>
</main>
