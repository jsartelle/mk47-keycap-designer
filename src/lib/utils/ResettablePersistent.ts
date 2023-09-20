import { browser } from '$app/environment'
import { get, writable, type Writable } from 'svelte/store'

export interface ResettablePersistent<T> extends Writable<T> {
	/** Returns a copy of the initial value, to avoid overwriting references */
	getInitialValue: () => T
	reset: () => void
}

export default function resettablePersistent<T>(initialValue: T, storageKey: string) {
	const storageKeyPrefixed = `keycapDesigner_${storageKey}`
	let storedValue
	if (browser) storedValue = localStorage.getItem(storageKeyPrefixed)

	const getInitialValue = () => JSON.parse(JSON.stringify(initialValue))

	// copy the initialValue when creating the store, so that calling update() doesn't
	// modify the original input object
	const store = writable<T>(
		storedValue ? JSON.parse(storedValue) : getInitialValue(),
	) as ResettablePersistent<T>

	const originalSet = store.set
	store.set = (new_value) => {
		localStorage.setItem(storageKeyPrefixed, JSON.stringify(new_value))
		originalSet(new_value)
	}

	store.update = (fn) => store.set(fn(get(store)))

	store.getInitialValue = getInitialValue
	store.reset = () => store.set(getInitialValue())

	return store
}
