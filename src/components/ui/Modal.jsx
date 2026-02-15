import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function ProjectModal({ project, isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = e => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
            return () => window.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000]"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-[1001] overflow-y-auto"
                    >
                        <div className="min-h-full flex items-center justify-center p-4">
                            <div className="card max-w-4xl w-full relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-primary-light hover:bg-primary transition-colors"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <img
                                    src={`/assets/images/${project.image}`}
                                    alt={project.title}
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                />
                                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                                <p className="text-text-secondary mb-6">{project.description}</p>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-primary-light rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary flex-1 text-center"
                                    >
                                        View Live
                                    </a>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline flex-1 text-center"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
