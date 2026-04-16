import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiLightBulb, HiCode, HiChartBar } from 'react-icons/hi';
import { projects } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ProjectCard = ({ project }) => (
  <motion.article
    variants={cardVariants}
    className="glass-card p-7 flex flex-col gap-5 group
               hover:border-indigo-300 dark:hover:border-indigo-500/40
               hover:shadow-xl hover:shadow-indigo-500/5
               transition-all duration-300"
  >
    {/* Header */}
    <div>
      {project.featured && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400
                         bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30
                         px-2.5 py-1 rounded-full mb-3">
          ⭐ Featured Project
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{project.subtitle}</p>
    </div>

    {/* Problem / Solution / Impact */}
    <div className="space-y-3 flex-1">
      <div className="flex gap-3">
        <HiLightBulb className="text-yellow-500 mt-0.5 shrink-0" size={16} />
        <div>
          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">Problem</span>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{project.problem}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <HiCode className="text-indigo-500 mt-0.5 shrink-0" size={16} />
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Solution</span>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{project.solution}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <HiChartBar className="text-emerald-500 mt-0.5 shrink-0" size={16} />
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Impact</span>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{project.impact}</p>
        </div>
      </div>
    </div>

    {/* Tech stack */}
    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-white/10">
      {project.tech.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 text-xs font-medium rounded-md
                     bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300
                     border border-gray-200 dark:border-white/10"
        >
          {t}
        </span>
      ))}
    </div>

    {/* Links */}
    <div className="flex items-center gap-3">
      {project.github && project.github !== '#' ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400
                     hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <FiGithub size={16} /> GitHub
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <FiGithub size={16} /> Private
        </span>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400
                     hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <FiExternalLink size={16} /> Live Demo
        </a>
      )}
    </div>
  </motion.article>
);

const Projects = () => (
  <section id="projects" className="py-20">
    <div className="section-container">
      <SectionTitle
        title="Projects"
        subtitle="Real problems solved with measurable outcomes"
      />

      <motion.div
        className="grid lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default Projects;
