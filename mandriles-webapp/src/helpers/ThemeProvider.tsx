"use client"

import React, { useEffect, useState } from "react"

export default function ThemeProvider() {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches)
		}

		setIsDarkMode(mediaQuery.matches)
		mediaQuery.addEventListener("change", handleChange)

		return () => mediaQuery.removeEventListener("change", handleChange) // Cleanup
	}, [])

	useEffect(() => {
		const html = document.documentElement
		if (isDarkMode) {
			html.classList.add("dark")
		} else {
			html.classList.remove("dark")
		}
	}, [isDarkMode])

	return null
}
