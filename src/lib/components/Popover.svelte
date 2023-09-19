<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let open: boolean
	export let width = 300
	export let top: number
	export let left: number

	let dialog: HTMLDialogElement
	let contents: HTMLDivElement

	let overflowTop = false
	let overflowBottom = false

	const dispatch = createEventDispatcher<{
		close: void
	}>()

	$: if (dialog) {
		if (open) {
			openDialog()
		} else if (dialog.open) {
			closeDialog()
		}
	}

	function openDialog() {
		dialog.showModal()
		contents.scrollTo(0, 0)
		measureOverflow()
	}

	function closeDialog() {
		dialog.close()
		contents.addEventListener('transitionend', () => dispatch('close'), {
			once: true,
		})
	}

	function measureOverflow() {
		overflowTop = open ? contents.scrollTop > 10 : false
		overflowBottom = open
			? contents.scrollTop + contents.clientHeight < contents.scrollHeight - 10
			: false
	}
</script>

<dialog bind:this={dialog}>
	<button class="close-dialog" on:click={() => (open = false)} aria-label="Close Popover" />
	<div
		bind:this={contents}
		class="contents"
		class:overflowTop
		class:overflowBottom
		style:--width={width + 'px'}
		style:--left={left + 'px'}
		style:--top={top + 'px'}
		on:scroll={measureOverflow}
	>
		<slot />
	</div>
</dialog>

<style lang="scss">
	dialog {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		background: none;
		backdrop-filter: none;

		&:not([open]) {
			pointer-events: none;
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

	.contents {
		position: absolute;
		left: clamp(
			var(--spacing),
			calc(var(--left) - var(--width) / 2),
			100vw - var(--width) - var(--spacing)
		);
		top: var(--top);
		width: var(--width);
		max-height: calc(100vh - var(--top) - var(--spacing));
		overflow: hidden scroll;
		overscroll-behavior: none;
		background: var(--background-color);
		box-shadow: 0 0 calc(var(--spacing) / 2) var(--form-element-border-color);
		border: var(--border-width) solid var(--form-element-border-color);
		border-radius: var(--border-radius);
		padding: 0 var(--spacing);
		scale: 0;
		transform-origin: top center;
		transition: scale var(--transition);
		container-type: inline-size;

		dialog[open] & {
			scale: 1;
			transition: scale var(--transition-bounce);
		}
	}

	.contents::before,
	.contents::after {
		--gradient-position: center 0;
		content: '';
		display: block;
		position: sticky;
		z-index: 1;
		top: var(--spacing);
		left: 0;
		transform: translate(calc(var(--spacing) * -1), calc(var(--spacing) * -1));
		height: var(--spacing);
		width: inherit;
		background: radial-gradient(
			75% 100% at var(--gradient-position),
			var(--form-element-border-color),
			transparent
		);
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--transition);
	}

	.contents::after {
		--gradient-position: center 100%;
		top: auto;
		bottom: var(--spacing);
		transform: translate(calc(var(--spacing) * -1), var(--spacing));
	}

	.contents.overflowTop::before,
	.contents.overflowBottom::after {
		opacity: 1;
	}
</style>
