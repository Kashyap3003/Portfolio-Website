import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { experience } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const Experience = () => (
  <section id="experience" className="py-20 bg-gray-50/80 dark:bg-white/[0.02]">
    <div className="section-container">
      <SectionTitle
        title="Experience"
        subtitle="Where I've worked and what I've achieved"
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent hidden sm:block" />

        <div className="space-y-8">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative sm:pl-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-5 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600
                              flex items-center justify-center shadow-md shadow-indigo-500/25 hidden sm:flex">
                <HiBriefcase className="text-white" size={18} />
              </div>

              {/* Card */}
              <div className="glass-card p-6 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">{job.company}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{job.location}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {job.period}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      job.type === 'Full-time'
                        ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                        : 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
