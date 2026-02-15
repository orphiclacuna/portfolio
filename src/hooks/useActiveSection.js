import { useState, useEffect } from 'react'

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const handleActiveSectionChange = (event) => {
            setActiveSection(event.detail)
        }

        window.addEventListener('activeSectionChange', handleActiveSectionChange)

        // Simple scroll-based detection as fallback
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'experience', 'projects']
            const scrollY = window.scrollY + window.innerHeight / 2

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    const elementTop = rect.top + window.scrollY
                    const elementBottom = elementTop + rect.height

                    if (scrollY >= elementTop && scrollY <= elementBottom) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check

        const observer = new IntersectionObserver(
            entries => {
                console.log('Intersection entries:', entries.map(entry => ({
                    id: entry.target.id,
                    isIntersecting: entry.isIntersecting,
                    intersectionRatio: entry.intersectionRatio
                })))

                // Find the section with the highest intersection ratio
                let maxRatio = 0
                let activeEntry = null

                entries.forEach(entry => {
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio
                        activeEntry = entry
                    }
                })

                if (activeEntry && activeEntry.intersectionRatio > 0.1) {
                    console.log('Setting active section to:', activeEntry.target.id, 'with ratio:', activeEntry.intersectionRatio)
                    setActiveSection(activeEntry.target.id)
                }
            },
            { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], rootMargin: '-10% 0px -10% 0px' }
        )

        const sections = document.querySelectorAll('section[id]')
        console.log('Found sections:', Array.from(sections).map(section => section.id))
        sections.forEach(section => {
            observer.observe(section)
        })

        return () => {
            window.removeEventListener('activeSectionChange', handleActiveSectionChange)
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    return activeSection
}
