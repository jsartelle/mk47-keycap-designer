<script lang="ts">
	import Keyboard from '$lib/components/Keyboard.svelte'
	import ResetButton from '$lib/components/ResetButton.svelte'
	import SettingsPage from '$lib/components/SettingsPage.svelte'
	import {
		caseColor,
		globalKeySettings,
		hideLegends,
		perKeySettings,
		type GlobalSettings,
		type KeySettings,
	} from '$lib/stores/store'
	import { HardDriveDownload, HardDriveUpload } from 'lucide-svelte'
	import { get } from 'svelte/store'

	interface SettingsExport {
		caseColor: string
		globalKeySettings: GlobalSettings
		perKeySettings: KeySettings[]
	}

	let downloadLink: HTMLAnchorElement
	let fileInput: HTMLInputElement
	let files: FileList

	function resetGlobalSettings() {
		if (confirm('Reset all global settings?')) {
			caseColor.reset()
			globalKeySettings.reset()
		}
	}

	function resetKeyColorsFonts() {
		if (confirm('Reset all key colors and fonts?')) {
			perKeySettings.forEach((store) =>
				store.update((value) => {
					const initialValue = store.getInitialValue()
					value.background = initialValue.background
					value.colorBase = initialValue.colorBase
					value.colorLayer1 = initialValue.colorLayer1
					value.colorLayer2 = initialValue.colorLayer2
					value.fontBase = initialValue.fontBase
					value.fontLayer1 = initialValue.fontLayer1
					value.fontLayer2 = initialValue.fontLayer2
					return value
				}),
			)
		}
	}

	function resetKeyLegends() {
		if (confirm('Reset all key legends?')) {
			perKeySettings.forEach((store) =>
				store.update((value) => {
					const initialValue = store.getInitialValue()
					value.legendBase = initialValue.legendBase
					value.legendLayer1 = initialValue.legendLayer1
					value.legendLayer2 = initialValue.legendLayer2
					return value
				}),
			)
		}
	}

	function saveSettings() {
		const settings: SettingsExport = {
			caseColor: $caseColor,
			globalKeySettings: $globalKeySettings,
			perKeySettings: Array.from(perKeySettings).map(([_, store]) => get(store)),
		}
		const blob = new Blob([JSON.stringify(settings, null, '\t')], {
			type: 'application/json',
		})
		const blobURL = URL.createObjectURL(blob)

		downloadLink.href = blobURL
		downloadLink.click()

		URL.revokeObjectURL(blobURL)
	}

	async function loadSettings(file?: File) {
		if (!file) return
		const settingsString = await file.text()
		const settings: SettingsExport = JSON.parse(settingsString)

		const settingsKeys: (keyof SettingsExport)[] = [
			'caseColor',
			'globalKeySettings',
			'perKeySettings',
		]

		if (!settingsKeys.every((key) => settings[key])) {
			alert('Invalid settings file.')
			return
		}

		$caseColor = settings.caseColor
		$globalKeySettings = settings.globalKeySettings
		settings.perKeySettings.forEach((keySettings, index) =>
			perKeySettings.get(index)!.set(keySettings),
		)
		alert('Settings successfully loaded!')
	}
	$: loadSettings(files?.[0])
</script>

<main>
	<h1>tiny idiot board</h1>

	<Keyboard />

	<section>
		<h1>Global Settings</h1>

		<fieldset>
			<label>
				<input type="color" bind:value={$caseColor} />
				<span>Case Color</span>
				{#if $caseColor !== caseColor.getInitialValue()}
					<ResetButton on:click={caseColor.reset} label="Reset Case Color" />
				{/if}
			</label>
			<label>
				<input type="checkbox" role="switch" bind:checked={$hideLegends} />
				<span>Hide Legends</span>
			</label>
		</fieldset>

		<h2>Keys</h2>
		<SettingsPage />

		<h2>Save/Load</h2>
		<fieldset>
			<button class="inline" on:click={saveSettings}>
				<HardDriveDownload />
				<span>Save Settings</span>
			</button>
			<button class="inline" on:click={() => fileInput.click()}>
				<HardDriveUpload />
				<span>Load Settings</span>
			</button>
		</fieldset>

		<h2>Reset</h2>
		<fieldset>
			<button class="inline contrast" on:click={resetGlobalSettings}>Reset Global Settings</button>
			<button class="inline contrast" on:click={resetKeyColorsFonts}
				>Reset All Key Colors & Fonts</button
			>
			<button class="inline contrast" on:click={resetKeyLegends}>Reset All Key Legends</button>
		</fieldset>
	</section>
</main>

<div aria-hidden="true">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a bind:this={downloadLink} download="mk47-keycaps.json">Download</a>
	<input bind:this={fileInput} type="file" accept="application/json" bind:files />
</div>

<style lang="scss">
	button span:not(:first-child) {
		margin-left: var(--spacing-small);
	}

	[aria-hidden='true'] {
		display: none;
	}
</style>
