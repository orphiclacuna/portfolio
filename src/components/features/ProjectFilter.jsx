import { motion } from 'framer-motion'

export default function ProjectFilter({ activeFilter, setActiveFilter }) {
    const filters = ['all', 'web', 'design', 'interactive']

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map(filter => (
                <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                        activeFilter === filter
                            ? 'bg-accent-purple text-white'
                            : 'bg-primary-card text-text-secondary hover:bg-primary-light'
                    }`}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
            ))}
        </div>
    )
}
