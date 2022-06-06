import { useState, useEffect } from "react";

export default function useData(key) {
	function getValue() {
		return JSON.parse(sessionStorage?.getItem(key));
	}

	const [value, setValue] = useState(() => {
		return getValue();
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
}
