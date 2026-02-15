import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const ProjectCard = forwardRef(function ProjectCard({ project, onClick }, ref) {
    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ y: -8 }}
            className="card group cursor-pointer"
            onClick={() => onClick(project)}
        >
            <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                    src={`/assets/images/${project.image}`}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">View Details</span>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-1 bg-primary-light rounded text-xs text-text-secondary">
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    )
})

export default ProjectCard
