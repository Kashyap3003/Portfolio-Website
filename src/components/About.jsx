import { motion } from 'framer-motion';
import { HiChip, HiCloud, HiDatabase } from 'react-icons/hi';
import { aboutText } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const EXPERTISE = [
  {
    icon: <HiChip size={26} />,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-500/15',
    border: 'border-indigo-200 dark:border-indigo-500/25',
    glow: 'hover:shadow-indigo-500/10',
    title: 'Backend Engineering',
    description:
      'Building scalable, production-grade REST APIs and event-driven systems that handle high-throughput healthcare data across distributed environments.',
    tags: ['.NET Core', 'C#', 'REST APIs', 'Event-Driven', 'xUnit'],
  },
  {
    icon: <HiCloud size={26} />,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-500/15',
    border: 'border-sky-200 dark:border-sky-500/25',
    glow: 'hover:shadow-sky-500/10',
    title: 'Cloud Infrastructure',
    description:
      'Designing and deploying cloud-native solutions on Azure — from async messaging with Service Bus to serverless compute with Azure Functions.',
    tags: ['Microsoft Azure', 'Azure Service Bus', 'Azure Functions', 'GCP', 'Datadog'],
  },
  {
    icon: <HiDatabase size={26} />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/15',
    border: 'border-emerald-200 dark:border-emerald-500/25',
    glow: 'hover:shadow-emerald-500/10',
    title: 'Data Engineering',
    description:
      'Crafting config-driven ETL pipelines with delta sync, schema mapping, retry logic, and encrypted staging — deployed across 42+ live locations.',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Avro', 'ETL'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const About = () => (
  <section id="about" className="py-20">
    <div className="section-container">
      <SectionTitle
        title="About Me"
        subtitle="A quick look at who I am and what I bring to the table"
      />

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-14"
      >
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
          {aboutText}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Event-Driven Architecture', 'Azure Cloud', '.NET Core', 'SOLID Principles', 'REST APIs'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300
                         border border-indigo-200 dark:border-indigo-500/30 rounded-lg text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Core Expertise cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {EXPERTISE.map(({ icon, color, bg, border, glow, title, description, tags }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            className={`glass-card p-7 flex flex-col gap-5 group
                        hover:shadow-xl ${glow}
                        hover:border-opacity-60 transition-all duration-300`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}
                             border ${border} group-hover:scale-110 transition-transform duration-200`}>
              {icon}
            </div>

            {/* Title + description */}
            <div>
              <h3 className={`text-base font-bold mb-2 ${color}`}>{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
              {tags.map((t) => (
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;
