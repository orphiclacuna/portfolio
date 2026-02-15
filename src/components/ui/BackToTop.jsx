import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => setVisible(window.scrollY > 500)
        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-20 right-8 z-50 p-4 rounded-full bg-transparent border-2 border-white/60 text-white shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300"
                    aria-label="Back to top"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
