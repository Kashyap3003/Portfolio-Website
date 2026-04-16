import { motion } from 'framer-motion';
import { aboutText, stats } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <SectionTitle
          title="About Me"
          subtitle="A quick look at who I am and what I bring to the table"
        />

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {aboutText}
            </p>

            <div className="flex flex-wrap gap-3">
              {['Event-Driven Architecture', 'Azure Cloud', '.NET Core', 'Healthcare Tech'].map((tag) => (
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

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-6 text-center hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
              >
                <div className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent mb-1">
                  {value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
