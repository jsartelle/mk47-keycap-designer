<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let open: boolean

	let dialog: HTMLDialogElement

	const dispatch = createEventDispatcher<{
		close: void
	}>()

	$: {
		if (dialog) {
			if (open) {
				dialog.showModal()
			} else if (dialog.open) {
				dialog.close()
				dialog.addEventListener('transitionend', () => dispatch('close'), {
					once: true,
				})
			}
		}
	}
</script>

<dialog bind:this={dialog}>
	<button class="close-dialog" on:click={() => (open = false)} aria-label="Close Popover" />
	<slot />
</dialog>

<style lang="scss">
	dialog {
		display: block;
		background: none;
		backdrop-filter: none;
		opacity: 0;
		transition: opacity var(--transition);

		&:not([open]) {
			pointer-events: none;
		}

		&[open] {
			opacity: 1;
		}

		&::backdrop {
			background: none;
		}
	}

	.close-dialog {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: none;
		border: none;
		cursor: default;
	}
</style>
