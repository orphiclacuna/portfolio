import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '../../data/projects'
import ProjectModal from '../ui/Modal'

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const totalCards = projects.length
    const scrollHeightVh = 100 + (totalCards * 100)

    return (
        <section id="projects" className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
                    <div className="w-20 h-1 bg-gradient-primary mx-auto" />
                </motion.div>

                <div ref={containerRef} style={{ height: `${scrollHeightVh}vh` }} className="relative">
                    <div className="sticky top-16 h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-4">
                        {projects.map((project, index) => {
                            const isFirst = index === 0
                            const cardProgress = 1 / totalCards
                            const startProgress = index * cardProgress
                            const slideUpEnd = startProgress + (cardProgress * 0.5)

                            const y = useTransform(
                                scrollYProgress,
                                isFirst ? [0, 1] : [startProgress, slideUpEnd],
                                isFirst ? ["0vh", "0vh"] : ["100vh", "0vh"]
                            )

                            const scale = useTransform(
                                scrollYProgress,
                                [startProgress, slideUpEnd],
                                [0.95, 1]
                            )

                            const opacity = useTransform(
                                scrollYProgress,
                                isFirst ? [0, 1] : [startProgress - 0.05, startProgress],
                                [1, 1]
                            )

                            return (
                                <motion.div
                                    key={project.id}
                                    style={{
                                        y,
                                        scale,
                                        opacity,
                                        zIndex: index + 1
                                    }}
                                    className="absolute inset-0 flex items-center justify-center px-4"
                                >
                                    <motion.div
                                        className="w-[95%] max-w-[95%] h-[90%] bg-primary/25 backdrop-blur-[30px] backdrop-saturate-[180%] border border-white/10 rounded-2xl shadow-2xl cursor-pointer overflow-hidden"
                                        whileHover={{ scale: 1.005 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <div className="relative h-full flex flex-col md:flex-row">
                                            <div className="w-full md:w-3/5 relative overflow-hidden h-2/5 md:h-full">
                                                <img
                                                    src={`/assets/images/${project.image}`}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                                                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.slice(0, 4).map(tech => (
                                                            <span key={tech} className="px-3 py-1.5 bg-primary/40 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white font-medium whitespace-nowrap">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-2/5 p-4 md:p-6 lg:p-8 flex flex-col justify-center h-3/5 md:h-full bg-gradient-to-br from-primary/30 to-transparent">
                                                <div className="space-y-3 md:space-y-4">
                                                    <div>
                                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-text-primary line-clamp-2">
                                                            {project.title}
                                                        </h3>
                                                        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                    </div>

                                                    <div className="pt-2 flex gap-3">
                                                        {project.liveLink && project.liveLink !== '#' && (
                                                            <a 
                                                                href={project.liveLink} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold transition-all duration-300 text-xs md:text-sm shadow-lg shadow-accent-pink/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2" 
                                                                style={{ background: 'linear-gradient(135deg, #da3e87 0%, #7110a0 100%)', color: 'white' }}
                                                            >
                                                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
                                                                </svg>
                                                                Demo
                                                            </a>
                                                        )}
                                                        {project.githubLink && project.githubLink !== '#' && (
                                                            <a 
                                                                href={project.githubLink} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold transition-all duration-300 text-xs md:text-sm border border-white/20 hover:border-white/40 backdrop-blur-sm bg-primary/40 text-white hover:bg-primary/60 flex items-center gap-2"
                                                            >
                                                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                                </svg>
                                                                GitHub
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    )
}
