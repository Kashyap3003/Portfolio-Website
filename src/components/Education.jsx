import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';
import { education, achievements } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const Education = () => (
  <section id="education" className="py-20">
    <div className="section-container">
      <SectionTitle
        title="Education & Achievements"
        subtitle="Academic background and notable accomplishments"
      />

      <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-7 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600
                            flex items-center justify-center shadow-md shadow-indigo-500/25 shrink-0">
              <HiAcademicCap className="text-white" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{education.degree}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">{education.school}</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{education.location}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
            <span className="text-sm text-gray-500 dark:text-gray-400">{education.graduation}</span>
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400
                             border border-indigo-200 dark:border-indigo-500/30 rounded-lg text-sm font-semibold">
              CPI: {education.cpi}
            </span>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="space-y-4">
          {achievements.map(({ icon, title, detail }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card px-5 py-4 flex items-center gap-4
                         hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
