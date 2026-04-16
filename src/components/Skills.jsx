import { motion } from 'framer-motion';
import { skillGroups } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Skills = () => (
  <section id="skills" className="py-20 bg-gray-50/80 dark:bg-white/[0.02]">
    <div className="section-container">
      <SectionTitle
        title="Technical Skills"
        subtitle="Technologies and tools I work with every day"
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {skillGroups.map(({ category, colorClass, bgClass, borderClass, items }) => (
          <motion.div
            key={category}
            variants={cardVariants}
            className="glass-card p-6 hover:shadow-md transition-shadow duration-300 group"
          >
            {/* Category header */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 ${bgClass} ${colorClass} border ${borderClass}`}>
              {category}
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;
