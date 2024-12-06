import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-cream/10 rounded-lg p-6 flex flex-col"
    >
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl text-cream mb-2">{project.title}</h3>
      <p className="text-cream/70 mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span key={index} className="px-3 py-1 bg-cream/20 rounded-full text-sm text-cream">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" 
             className="px-4 py-2 bg-cream/20 rounded-lg text-cream hover:bg-cream/30">
            GitHub
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-cream/20 rounded-lg text-cream hover:bg-cream/30">
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;