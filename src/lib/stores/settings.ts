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
