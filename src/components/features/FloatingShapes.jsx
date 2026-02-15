import { motion, useScroll, useTransform } from 'framer-motion'

export default function FloatingShapes() {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 1000], [0, -300])
    const y2 = useTransform(scrollY, [0, 1000], [0, -400])
    const y3 = useTransform(scrollY, [0, 1000], [0, -500])
    const y4 = useTransform(scrollY, [0, 1000], [0, -350])
    const y5 = useTransform(scrollY, [0, 1000], [0, -450])
    const y6 = useTransform(scrollY, [0, 1000], [0, -250])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-64 h-64 bg-accent-purple/15 rounded-full blur-lg animate-float" />
            <motion.div style={{ y: y2, animationDelay: '2s' }} className="absolute top-40 right-20 w-96 h-96 bg-accent-pink/15 rounded-full blur-lg animate-float" />
            <motion.div style={{ y: y3, animationDelay: '4s' }} className="absolute bottom-20 left-1/2 w-80 h-80 bg-accent-purple/15 rounded-full blur-lg animate-float" />
            <motion.div style={{ y: y4, animationDelay: '1s' }} className="absolute top-32 right-1/3 w-72 h-72 bg-accent-purple/15 rounded-full blur-lg animate-float" />
            <motion.div style={{ y: y5, animationDelay: '3s' }} className="absolute bottom-40 left-20 w-56 h-56 bg-accent-yellow/20 rounded-full blur-lg animate-float" />
            <motion.div style={{ y: y6, animationDelay: '5s' }} className="absolute top-60 left-2/3 w-48 h-48 bg-accent-purple/20 rounded-full blur-lg animate-float" />
        </div>
    )
}
