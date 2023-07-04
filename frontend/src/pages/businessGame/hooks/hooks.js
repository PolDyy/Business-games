import { useState } from "react"

export function useChangeDisplay(initial = true) {
	const [display, setDisplay] = useState(initial)

	function changeDisplay() {
		if (display) {
			setDisplay(false)
		}
		if (!display) {
			setDisplay(true)
		}
	}

	return [display, changeDisplay]
}
