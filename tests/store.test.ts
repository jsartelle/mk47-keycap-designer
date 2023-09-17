import { get } from 'svelte/store'
import { describe, expect, it, vi, type Mock } from 'vitest'

const storageKey = 'store_test'
const inputValue = { number: 123, fruit: 'apple' }

vi.mock('$app/environment', () => {
	return {
		browser: true,
	}
})

vi.stubGlobal('localStorage', {
	getItem: vi.fn(),
	setItem: vi.fn(),
})

const { resettablePersistent } = await import('$lib/stores/store')

describe('ResettablePersistent', () => {
	it('should check localStorage for value on creation', () => {
		const storedValue = { storedValue: true }
		;(localStorage.getItem as Mock).mockReturnValueOnce(JSON.stringify(storedValue))

		const store = resettablePersistent({}, storageKey)

		expect(localStorage.getItem).toHaveBeenLastCalledWith(expect.stringContaining(storageKey))
		expect(get(store)).toEqual(storedValue)
	})

	it('should save value to store and localStorage when calling set', () => {
		const store = resettablePersistent({}, storageKey)
		store.set(inputValue)

		expect(localStorage.setItem).toHaveBeenLastCalledWith(
			expect.stringContaining(storageKey),
			JSON.stringify(inputValue),
		)
		expect(get(store)).toEqual(inputValue)
	})

	it('should provide current value to update, and save result to store and localStorage', () => {
		const store = resettablePersistent(inputValue, storageKey)
		store.update((value) => {
			expect(value).toEqual(inputValue)
			expect(value).not.toBe(inputValue)

			value.fruit = 'banana'
			return value
		})

		expect(localStorage.setItem).toHaveBeenLastCalledWith(
			expect.stringContaining(storageKey),
			JSON.stringify({
				number: 123,
				fruit: 'banana',
			}),
		)
		expect(get(store)).toEqual({
			number: 123,
			fruit: 'banana',
		})
	})

	it('should return copy of initial value from getInitialValue', () => {
		const store = resettablePersistent(inputValue, storageKey)
		const initialValue = store.getInitialValue()

		expect(initialValue).toEqual(inputValue)
		expect(initialValue).not.toBe(inputValue)
	})

	it('should reset value when reset is called', () => {
		const store = resettablePersistent(inputValue, storageKey)
		store.set({ number: 456, fruit: 'orange' })

		expect(get(store)).not.toEqual(inputValue)

		store.reset()

		expect(get(store)).toEqual(inputValue)
		expect(get(store)).not.toBe(inputValue)
		expect(localStorage.setItem).toHaveBeenLastCalledWith(
			expect.stringContaining(storageKey),
			JSON.stringify(inputValue),
		)
	})
})
