import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import TypingEffect from '../features/TypingEffect'
import FloatingShapes from '../features/FloatingShapes'

export default function HeroAboutTransition() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.8], [1, 40])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
    const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85], [1, 1, 0])
    const aboutOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1])

    useEffect(() => {
        const unsubscribe = headingOpacity.on('change', (value) => {
            if (value < 0.1) {
                window.dispatchEvent(new CustomEvent('activeSectionChange', { detail: 'about' }))
            } else {
                window.dispatchEvent(new CustomEvent('activeSectionChange', { detail: 'home' }))
            }
        })
        return unsubscribe
    }, [headingOpacity])

    const phrases = ['Web Developer', 'Software Developer', 'Quick Learner', 'Problem Solver']
    const intro = "Hi, I'm "
    const name = "Anushka"

    const socialLinks = [
        {
            name: 'GitHub',
            icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
            href: 'https://github.com/orphiclacuna'
        },
        {
            name: 'LinkedIn',
            icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
            href: 'https://linkedin.com/in/anushka-bhakare'
        },
        {
            name: 'Email',
            icon: 'M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z',
            href: 'mailto:anushkabhakare07@gmail.com'
        }
    ]

    return (
        <div ref={containerRef} id="home" className="relative h-[700vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.section id="about" style={{ opacity: aboutOpacity }} className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="text-center mb-12 pt-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
                            <div className="w-20 h-1 bg-gradient-primary mx-auto" />
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4 text-text-secondary text-lg">
                            <p>
                                Hey, I’m a Full-Stack Developer who enjoys turning ideas into interactive, scalable web experiences. I’m currently a final-year student with hands-on experience from internships, where I worked across both frontend and backend systems. I like solving real problems, optimizing performance, and creating smooth user experiences. Whether it's a sleek frontend animation or a well-structured API, I aim for systems that feel effortless (even if they weren’t).
                            </p>
                            <p>
                                Outside of coding, you’ll probably find me stargazing (duh!), experimenting with photography, reading about psychology, or diving into a good book. I’m fascinated by how both the universe and the human mind work, which probably explains why I love building things that connect people and ideas.
                            </p>
                            <p>
                                Always learning. Always building. Occasionally debugging at 2AM.
                            </p>
                        </div>
                    </div>
                </motion.section>

                <section className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
                        <FloatingShapes />
                    </motion.div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6 pt-12">
                            <motion.h1 style={{ scale, opacity: headingOpacity }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl origin-center">
                                {intro.split('').map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 5 + index * 0.1, duration: 0.5 }}
                                        className="font-normal"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 5 + intro.length * 0.1, duration: 0.5 }}
                                    className="text-transparent bg-clip-text bg-gradient-hero font-bold"
                                >
                                    {name}
                                </motion.span>
                            </motion.h1>
                            <motion.div style={{ opacity: heroOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7 }} className="text-2xl sm:text-3xl md:text-4xl text-text-secondary font-medium">
                                <TypingEffect phrases={phrases} />
                            </motion.div>
                            <motion.p style={{ opacity: heroOpacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.2 }} className="max-w-2xl mx-auto text-lg text-text-muted">
                                Building beautiful and functional web experiences with passion and creativity
                            </motion.p>
                            <motion.div style={{ opacity: heroOpacity }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-16">
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">View My Resume</a>
                                <a href="#about" className="btn-outline-white">About Me</a>
                            </motion.div>
                        </motion.div>
                    </div>
                    <motion.div style={{ opacity: heroOpacity }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                transition={{ delay: 1.4 + index * 0.1 }}
                                className="group relative flex items-center transition-all duration-300"
                                aria-label={social.name}
                            >
                                <span className="absolute right-full mr-2 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-sm font-medium text-white whitespace-nowrap">
                                    {social.name}
                                </span>
                                <div className="p-3 text-white hover:text-accent-pink transition-colors">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </section>
            </div>
        </div>
    )
}
