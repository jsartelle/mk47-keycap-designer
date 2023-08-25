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

<main>
	<h1>tiny idiot board</h1>

	<Keyboard />

	<section class="options">
		<h1>Default Options</h1>

		<fieldset>
			<div class="grid">
				<label>
					<input type="text" bind:value={$fontBase} placeholder="system-ui" />
					<span>Main</span>
				</label>
				<label>
					<input type="text" bind:value={$fontLayer1} placeholder="system-ui" />
					<span>Layer 1</span>
				</label>
				<label>
					<input type="text" bind:value={$fontLayer2} placeholder="system-ui" />
					<span>Layer 2</span>
				</label>
			</div>
			<div class="grid">
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
