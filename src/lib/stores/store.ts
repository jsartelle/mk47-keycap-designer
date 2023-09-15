import { browser } from '$app/environment'
import { writable, type Writable } from 'svelte/store'

export interface ResettablePersistent<T> extends Writable<T> {
	initialValue: T
	reset(): void
}

const resettablePersistent = <T>(value: T, storageKey: string) => {
	const storageKeyPrefixed = `keycapDesigner_${storageKey}`
	let storedValue
	if (browser) storedValue = localStorage.getItem(storageKeyPrefixed)

	const store = writable<T>(
		storedValue ? JSON.parse(storedValue) : value,
	) as ResettablePersistent<T>

	const originalSet = store.set
	store.set = (new_value) => {
		localStorage.setItem(storageKeyPrefixed, JSON.stringify(new_value))
		originalSet(new_value)
	}

	store.update = (fn) => store.set(fn(value))

	// copy the value to avoid overwriting the reference when the current value changes
	store.initialValue = JSON.parse(JSON.stringify(value))
	store.reset = () => store.set(JSON.parse(JSON.stringify(value)))

	return store
}

export interface GlobalSettings {
	background: string
	colorBase: string
	fontBase: string
	colorLayer1: string
	fontLayer1: string
	colorLayer2: string
	fontLayer2: string
}

export interface KeySettings extends Partial<GlobalSettings> {
	legendBase: string
	legendLayer1: string
	legendLayer2: string
}

const initialGlobalSettings: GlobalSettings = {
	background: '#19181a',
	colorBase: '#ccdfee',
	fontBase: '',
	colorLayer1: '#8d0eec',
	fontLayer1: '',
	colorLayer2: '#43a7fc',
	fontLayer2: '',
}

const initialLegends: [string, string, string][] = [
	['Esc', '', ''],
	['Q', 'F1', 'F11'],
	['W', 'F2', 'F12'],
	['E', 'F3', 'Emoji'],
	['R', 'F4', ''],
	['T', 'F5', ''],
	['Y', 'F6', 'PgUp'],
	['U', 'F7', 'Home'],
	['I', 'F8', '⬆️'],
	['O', 'F9', 'End'],
	['P', 'F10', ''],
	['Bksp', '', 'Del'],
	['Tab', '` ~', 'Caps'],
	['A', '1 !', ''],
	['S', '2 @', ''],
	['D', '3 #', ''],
	['F', '4 $', 'Full'],
	['G', '5 %', ''],
	['H', '6 ^', 'PgDn'],
	['J', '7 &', '⬅️'],
	['K', '8 *', '⬇️'],
	['L', '9 (', '➡️'],
	['; :', '0 )', ''],
	['\' "', '- _', 'Lang'],
	['Shift', '', ''],
	['Z', '', ''],
	['X', '<-Space', 'Prev'],
	['C', '', 'Play'],
	['V', '->Space', 'Next'],
	['B', 'Back', 'Scr-'],
	['N', 'Fwd', 'Scr+'],
	['M', '<-Tab', 'Mute'],
	[', <', '->Tab', 'Vol-'],
	['. >', '[ {', 'Vol+'],
	['/ ?', '] }', ''],
	['Enter', '=+', ''],
	['Mo(2)', '', ''],
	['Ctrl', '', ''],
	['Mo(1)', '', ''],
	['Opt', '', ''],
	['Cmd', '', ''],
	['', '', ''],
	['Mo(1)', '', ''],
	['Undo', '', ''],
	['Redo', '', ''],
	['Mo(2)', '', ''],
	['\\ |', '', ''],
]

export const caseColor = resettablePersistent('#000000', 'caseColor')

export const globalKeySettings = resettablePersistent(initialGlobalSettings, 'globalKeySettings')

export const perKeySettings = new Map(
	initialLegends.map((value, index) => [
		index,
		resettablePersistent<KeySettings>(
			{
				legendBase: value[0],
				legendLayer1: value[1],
				legendLayer2: value[2],
			},
			`perKeySettings_${index}`,
		),
	]),
)
