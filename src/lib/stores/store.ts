import { writable } from 'svelte/store'

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

const initialKeySettings: GlobalSettings = {
	fontBase: '',
	fontLayer1: '',
	fontLayer2: '',
	background: '#19181a',
	colorBase: '#ccdfee',
	colorLayer1: '#8d0eec',
	colorLayer2: '#43a7fc',
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
	['P', 'F10', 'Del'],
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
	['\' "', '- _', ''],
	['Shift', '', ''],
	['Z', '', ''],
	['X', '<-Space', 'Prv'],
	['C', 'Lang', 'Play'],
	['V', '->Space', 'Fwd'],
	['B', '', 'Scr-'],
	['N', '', 'Scr+'],
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
	['Undo', '', 'Back'],
	['Redo', '', 'Fwd'],
	['Mo(2)', '', ''],
	['\\ |', '', ''],
]

/* TODO persist all in localStorage */
export const keyboardBackground = writable('#000000')

export const globalKeySettings = writable(initialKeySettings)

export const perKeySettings = new Map(
	initialLegends.map((value, index) => [
		index,
		writable<KeySettings>({
			legendBase: value[0],
			legendLayer1: value[1],
			legendLayer2: value[2],
		}),
	]),
)
