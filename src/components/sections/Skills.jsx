import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { skillCategories } from '../../data/skills'
import {
    HTML5,
    CSS3,
    JavaScript,
    React,
    ThreeJsLight,
    Bootstrap5,
    TailwindCSS,
    JQuery,
    NodeJs,
    ExpressJsLight,
    Django,
    Python,
    Java,
    C,
    MongoDB,
    Firebase,
    MySQL,
    Git,
    Docker,
    GoogleCloud
} from 'developer-icons'

const getSkillIcon = (skillName) => {
    const iconMap = {
        'HTML5': <HTML5 size="40" />,
        'CSS3': <CSS3 size="40" />,
        'JavaScript': <JavaScript size="40" />,
        'React.js': <React size="40" />,
        'Three.js': <ThreeJsLight size="40" />,
        'Bootstrap': <Bootstrap5 size="40" />,
        'Tailwind CSS': <TailwindCSS size="40" />,
        'jQuery': <JQuery size="40" />,
        'Node.js': <NodeJs size="40" />,
        'Express.js': <ExpressJsLight size="40" />,
        'Django': <Django size="40" />,
        'JavaScript (ES6+)': <JavaScript size="40" />,
        'Python': <Python size="40" />,
        'Java': <Java size="40" />,
        'C': <C size="40" />,
        'MongoDB': <MongoDB size="40" />,
        'Firebase': <Firebase size="40" />,
        'MySQL': <MySQL size="40" />,
        'SQLite': <img src="https://static.cdnlogo.com/logos/s/68/sqlite.svg" alt="SQLite" className="w-10 h-10" />, // Using CDN logo
        'Git': <Git size="40" />,
        'Docker': <Docker size="40" />,
        'Google Cloud Platform (GCP)': <GoogleCloud size="40" />,
        'RESTful APIs': <img src="https://logodix.com/logo/2088920.png" alt="RESTful APIs" className="w-10 h-10" />, // Using custom logo
    };
    return iconMap[skillName] || <div className="w-10 h-10 bg-gray-500 rounded flex items-center justify-center text-white text-xs">?</div>;
};

function SkillIcon({ skill, index }) {
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-20 h-20 bg-primary/25 backdrop-blur-[30px] backdrop-saturate-[180%] border border-white/10 rounded-2xl flex items-center justify-center hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                {getSkillIcon(skill.name)}
            </motion.div>
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-primary/40 backdrop-blur-sm border border-white/20 text-white text-xs font-medium rounded-full transition-opacity duration-300 whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {skill.name}
            </div>
        </motion.div>
    )
}

export default function Skills() {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id="skills" className="py-20 sm:py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills</h2>
                    <div className="w-20 h-1 bg-gradient-primary mx-auto" />
                </motion.div>
                <div className="space-y-12">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                            className="text-center"
                        >
                            <h3 className="text-2xl font-bold mb-6" style={{ color: '#da3e87' }}>{category.title}</h3>
                            <div className="flex flex-wrap gap-6 justify-center">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillIcon key={skill.name} skill={skill} index={skillIndex} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
