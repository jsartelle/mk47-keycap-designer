import { writable } from 'svelte/store'

export interface KeySettings {
	fontBase: string
	fontLayer1: string
	fontLayer2: string
	background: string
	colorBase: string
	colorLayer1: string
	colorLayer2: string
}

export type KeyLegend = [string | null, string | null, string | null]

/* TODO persist in localStorage */
export const defaultSettings = writable<KeySettings>({
	fontBase: '',
	fontLayer1: '',
	fontLayer2: '',
	background: '#000000',
	colorBase: '#ffffff',
	colorLayer1: '#ffffff',
	colorLayer2: '#ffffff',
})

export const layout = writable<KeyLegend[]>([
	['Esc', null, null],
	['Q', 'F1', 'F11'],
	['W', 'F2', 'F12'],
	['E', 'F3', 'Emoji'],
	['R', 'F4', null],
	['T', 'F5', null],
	['Y', 'F6', 'PgUp'],
	['U', 'F7', 'Home'],
	['I', 'F8', '⬆️'],
	['O', 'F9', 'End'],
	['P', 'F10', 'Del'],
	['Bksp', null, 'Del'],
	['Tab', null, null],
	['A', '1!', null],
	['S', '2@', null],
	['D', '3#', null],
	['F', '4$', 'Fullscreen'],
	['G', '5%', null],
	['H', '6^', 'PgDn'],
	['J', '7&', '⬅️'],
	['K', '8*', '⬇️'],
	['L', '9(', '➡️'],
	[';:', '0)', null],
	['\'"', '-_', null],
	['Shift', null, null],
	['Z', null, null],
	['X', '<-Space', 'Prv'],
	['C', null, 'Play'],
	['V', '>-Space', 'Next'],
	['B', null, 'Scr-'],
	['N', null, 'Scr+'],
	['M', '<-Tab', 'Mute'],
	[',<', '>-Tab', 'Vol-'],
	['.>', '[{', 'Vol+'],
	['/?', ']}', null],
	['Enter', '=+', null],
	['Mo(2)', null, null],
	['Ctrl', null, null],
	['Mo(1)', null, null],
	['Opt', null, null],
	['Cmd', null, null],
	[null, null, 'Lang'],
	['Mo(1)', null, null],
	['Undo', null, 'Back'],
	['Redo', null, 'Fwd'],
	['Mo(2)', null, null],
	['\\|', null, null],
])
