import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'
// import ThemeToggle from '../ui/ThemeToggle'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const activeSection = useActiveSection()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' }
    ]

    const handleClick = (e, href) => {
        e.preventDefault()
        setIsOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
                scrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#home" className="flex items-center" onClick={(e) => handleClick(e, '#home')}>
                        <img src="/assets/logo.png" alt="Logo" className="h-12 w-12" />
                    </a>
                    <div className="hidden md:flex items-center space-x-6">
                        <ul className="flex space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleClick(e, link.href)}
                                        className={`text-lg font-medium transition-colors hover:text-[#da3e87] ${
                                            activeSection === link.href.slice(1) ? 'text-[#da3e87]' : 'text-text-secondary'
                                        }`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {/* <ThemeToggle /> */}
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-primary-card transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-primary-card/95 backdrop-blur-lg"
                >
                    <ul className="px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className={`block text-lg font-medium transition-colors hover:text-[#da3e87] ${
                                        activeSection === link.href.slice(1) ? 'text-[#da3e87]' : 'text-text-secondary'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <li className="pt-2 flex">
                            {/* <ThemeToggle /> */}
                        </li>
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    )
}
