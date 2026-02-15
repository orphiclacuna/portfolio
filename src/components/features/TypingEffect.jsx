import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TypingEffect({ phrases }) {
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prevRotation) => prevRotation + 90) // Always rotate forward by 90 degrees
        }, 3000) // Change phrase every 3 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="relative h-12 w-full flex items-center justify-center"
            style={{
                perspective: '1000px',
            }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateX: rotation, // Use continuous rotation value
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            >
                {phrases.map((phrase, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: `rotateX(${index * 90}deg) translateZ(24px)`,
                        }}
                    >
                        <span className="text-2xl sm:text-3xl md:text-4xl text-text-secondary font-medium">
                            {phrase}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
