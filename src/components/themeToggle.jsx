"use client"

import { useState, useEffect } from "react"

const ThemeToggle = () => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme || "light"
  })

  // Apply theme to document when component mounts or theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="theme-toggle">
      <span className="toggle-icon">☀️</span>
      <label className="toggle-switch">
        <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
        <span className="toggle-slider"></span>
      </label>
      <span className="toggle-icon">🌙</span>
    </div>
  )
}

export default ThemeToggle
