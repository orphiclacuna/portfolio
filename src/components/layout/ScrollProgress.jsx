import { useScrollProgress } from '../../hooks/useScrollProgress'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
    const progress = useScrollProgress()

    return (
        <div className="fixed left-4 top-0 h-screen w-1 bg-primary-light/20 z-[101] flex items-start py-20">
            <div className="w-full bg-gradient-primary transition-all duration-100 rounded-full relative" style={{ height: `${progress}%` }}>
                {/* Astronaut hanging from the progress bar */}
                <motion.div
                    className="absolute -right-2 top-full transform -translate-y-full"
                    animate={{
                        rotate: [0, 3, -3, 0],
                        x: [0, 1, -1, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img
                        src="/assets/images/astronaut.png"
                        alt="Astronaut"
                        style={{
                            width: '50px',
                            height: 'auto',
                            maxWidth: 'none',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    )
}
