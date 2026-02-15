import { useState, useEffect, useRef } from 'react'

export function useExperienceProgress() {
    const [progress, setProgress] = useState(0)
    const sectionRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const section = sectionRef.current
            const rect = section.getBoundingClientRect()
            const sectionHeight = section.offsetHeight
            const windowHeight = window.innerHeight

            // Offset for the heading (approximately 128px)
            const headingOffset = 128

            const scrollStart = rect.top + headingOffset
            const scrollEnd = rect.bottom - windowHeight

            if (scrollStart > 0) {
                setProgress(0)
            } else if (scrollEnd < 0) {
                setProgress(100)
            } else {
                const scrolled = Math.abs(scrollStart)
                const totalScroll = sectionHeight - windowHeight - headingOffset
                const progressPercent = (scrolled / totalScroll) * 100
                setProgress(Math.min(Math.max(progressPercent, 0), 100))
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return { progress, sectionRef }
}
