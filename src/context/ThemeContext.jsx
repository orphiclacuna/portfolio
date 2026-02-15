import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            /* document.documentElement.classList.remove('light') */
        } else {
            document.documentElement.classList.remove('dark')
            /* document.documentElement.classList.add('light') */
        }
    }, [theme])

    /* const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark') */
    const toggleTheme = () => setTheme('dark') // Always set to dark mode

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within ThemeProvider')
    return context
}
