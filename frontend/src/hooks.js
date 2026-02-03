import { useEffect } from "react";

export function useTitle(callback, dependencies = []) {
	useEffect(() => {
		document.title = callback() + " - LMS";
	}, dependencies);
}
