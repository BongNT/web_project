import { useState, useEffect } from "react";

export default function useAuth() {
	function getValue() {
		const userAccess = JSON.parse(sessionStorage.getItem("user_access"));

		return {
			user: userAccess?.user,
			token: userAccess?.token,
			role: userAccess?.role,
		};
	}

	const [value, setValue] = useState(() => {
		return getValue();
	});

	useEffect(() => {
		sessionStorage.setItem(
			"user_access",
			JSON.stringify({
				user: value.user,
				token: value.token,
				role: value.role,
			})
		);
	}, [value]);

	return [value, setValue];
}
