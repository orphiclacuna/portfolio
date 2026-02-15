import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id="about" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-center mb-12 pt-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-gradient-primary mx-auto" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="max-w-3xl mx-auto space-y-4 text-text-secondary text-lg"
                >
                    <p>
                        Hey, I’m a Full-Stack Developer who enjoys turning ideas into interactive, scalable web experiences. I’m currently a final-year student with hands-on experience from internships, where I worked across both frontend and backend systems. I like solving real problems, optimizing performance, and creating smooth user experiences. Whether it's a sleek frontend animation or a well-structured API, I aim for systems that feel effortless (even if they weren’t).
                    </p>
                    <p>
                        Outside of coding, you’ll probably find me stargazing, experimenting with photography, reading about psychology, or diving into a good book. I’m fascinated by how both the universe and the human mind work, which probably explains why I love building things that connect people and ideas.
                    </p>
                    <p>
                        Always learning. Always building. Occasionally debugging at 2AM.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
