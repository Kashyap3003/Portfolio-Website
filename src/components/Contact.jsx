import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { personal } from '../data/resumeData';
import SectionTitle from './SectionTitle';

const CONTACT_LINKS = [
  { icon: <FiMail size={20} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: <FiPhone size={20} />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
  { icon: <FiGithub size={20} />, label: 'GitHub', value: 'kashyapajudiya', href: personal.github },
  { icon: <FiLinkedin size={20} />, label: 'LinkedIn', value: 'Kashyap Ajudiya', href: personal.linkedin },
  { icon: <FiMapPin size={20} />, label: 'Location', value: personal.location, href: null },
];

const Contact = () => (
  <section id="contact" className="py-20 bg-gray-50/80 dark:bg-white/[0.02]">
    <div className="section-container">
      <SectionTitle
        title="Get In Touch"
        subtitle="I'm always open to interesting roles and collaborations"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-center">
          Whether you have an opportunity, a question, or just want to connect — my inbox is always open.
          I'll get back to you as soon as possible.
        </p>

        <div className="glass-card p-8 space-y-5">
          {CONTACT_LINKS.map(({ icon, label, value, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30
                              flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
