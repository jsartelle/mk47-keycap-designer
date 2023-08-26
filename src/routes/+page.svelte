<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte'
	import Settings from '$lib/components/Settings.svelte'
</script>

<main>
	<h1>tiny idiot board</h1>

	<Keyboard />

	<section class="settings">
		<h1>Default Settings</h1>

		<Settings />
	</section>
</main>
