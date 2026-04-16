import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-14">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto mt-4 rounded-full origin-left"
    />
  </div>
);

export default SectionTitle;
