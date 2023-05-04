import { useState } from 'react';

export const useLocalStorage = (key: any, initialValue: any) => {
	const [value, setValue] = useState(() => {
		const storedValue = window.localStorage.getItem(key);
		return storedValue !== null ? JSON.parse(storedValue) : initialValue;
	});

	const setLocalStorageValue = (newValue: any) => {
		setValue(newValue);
		window.localStorage.setItem(key, JSON.stringify(newValue));
	};

	return [value, setLocalStorageValue];
};
