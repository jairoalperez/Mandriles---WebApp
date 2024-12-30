"use client"

import React, { useEffect, useState } from "react"

export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
        console.log('Dark mode:', e.matches);
    };

    // Set initial state
    useEffect(() => {
        setIsDarkMode(mediaQuery.matches);
        console.log('Initial dark mode:', mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        // Clean up the event listener on component unmount
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isDarkMode;
};

export default function ThemeProvider() {
    const isDarkMode = useDarkMode()

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
