import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experience } from '../../data/experience'
import { useExperienceProgress } from '../../hooks/useExperienceProgress'

function TimelineItem({ item, index }) {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
    const isLeft = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-12`}
        >
            <div className="flex-1">
                <div className="bg-primary/25 backdrop-blur-[30px] backdrop-saturate-[180%] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-sm font-semibold mb-2" style={{ color: '#da3e87' }}>{item.date}</div>
                    <h3 className="text-xl font-bold mb-2 text-text-primary">{item.title}</h3>
                    <p className="text-text-secondary text-sm font-medium mb-2">{item.place}</p>
                    <p className="text-text-secondary mb-4 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-primary/40 backdrop-blur-sm border border-white/20 rounded-full text-xs text-white font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative flex-shrink-0 z-10">
                <div className="w-4 h-4 rounded-full border-4 border-white/20" style={{ background: 'linear-gradient(135deg, #da3e87, #664ad7)' }} />
            </div>
            <div className="flex-1 hidden md:block" />
        </motion.div>
    )
}

export default function Experience() {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
    const { progress, sectionRef } = useExperienceProgress()

    return (
        <section ref={sectionRef} id="experience" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience & Education</h2>
                    <div className="w-20 h-1 bg-gradient-primary mx-auto" />
                </motion.div>
                <div className="absolute left-1/2 top-32 h-[calc(100%-8rem)] w-1 bg-white/10 -translate-x-1/2 hidden md:block rounded-full">
                    <motion.div
                        className="w-full transition-all duration-300 rounded-full"
                        style={{ 
                            height: `${progress}%`,
                            background: 'linear-gradient(135deg, #da3e87, #664ad7)'
                        }}
                    />
                </div>
                <div className="max-w-4xl mx-auto">
                    {experience.map((item, index) => (
                        <TimelineItem key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
