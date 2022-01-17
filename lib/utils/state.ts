export const loadState = <T>(key: string): T | null => {
	if (isBrowser) {
		const serializedState = localStorage.getItem(key);
		return serializedState ? (JSON.parse(serializedState) as T) : null;
	}

	return null;
};

export const saveState = <T>(key: string, state: T): T => {
	try {
		if (isBrowser) {
			const serializedState = JSON.stringify(state);
			localStorage.setItem(key, serializedState);
		}
	} catch {
		// intentionally empty
	}

	return state;
};

export const clearState = (key: string) => {
	if (isBrowser) {
		localStorage.removeItem(key);
	}
};

export const isBrowser = typeof window !== 'undefined';