import { motion } from 'framer-motion';
import { HiLightningBolt, HiLocationMarker, HiLink, HiCode } from 'react-icons/hi';
import { aboutText, stats } from '../data/resumeData';
import SectionTitle from './SectionTitle';

// Icons mapped to each stat by index
const STAT_ICONS = [
  <HiLightningBolt size={22} />,
  <HiLocationMarker size={22} />,
  <HiLink size={22} />,
  <HiCode size={22} />,
];

const STAT_COLORS = [
  { text: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { text: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  { text: 'text-sky-500',    bg: 'bg-sky-50 dark:bg-sky-500/10' },
  { text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
];

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <SectionTitle
          title="About Me"
          subtitle="A quick look at who I am and what I bring to the table"
        />

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {aboutText}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
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

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-white/10">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 px-6 py-8 group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                {/* Icon bubble */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${STAT_COLORS[i].bg} ${STAT_COLORS[i].text}
                                 group-hover:scale-110 transition-transform duration-200`}>
                  {STAT_ICONS[i]}
                </div>

                {/* Value */}
                <span className={`text-4xl font-black ${STAT_COLORS[i].text}`}>
                  {value}
                </span>

                {/* Label */}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center leading-tight">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
