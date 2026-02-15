import { useState, useEffect } from 'react'

export function useScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / docHeight) * 100
            setProgress(scrollPercent)
        }

        window.addEventListener('scroll', updateProgress, { passive: true })
        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return progress
}
