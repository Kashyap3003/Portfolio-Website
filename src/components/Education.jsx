import { motion } from 'framer-motion';
import { HiAcademicCap, HiExternalLink } from 'react-icons/hi';
import { education, achievements } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

const Education = () => (
  <section id="education" className="py-24 sm:py-28">
    <div className="section-container">
      <SectionTitle
        index="05"
        eyebrow="Education"
        title="Education & Achievements"
        subtitle="Academic background and notable accomplishments"
      />

      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="[perspective:1100px]"
        >
          <Tilt3D className="panel group flex h-full flex-col p-7">
            <div className="mb-5 flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), #38bdf8)',
                  color: 'var(--on-accent)',
                  boxShadow: '0 8px 24px -8px rgba(var(--accent-rgb),0.6)',
                }}
              >
                <HiAcademicCap size={22} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">{education.degree}</h3>
                <p className="text-sm font-semibold text-accent">{education.school}</p>
                <p className="mono mt-0.5 text-xs text-muted">{education.location}</p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4">
              <span className="mono text-sm text-muted">{education.graduation}</span>
              <span
                className="mono rounded-lg px-3 py-1 text-sm font-semibold"
                style={{
                  color: 'var(--accent)',
                  background: 'rgba(var(--accent-rgb),0.1)',
                  border: '1px solid rgba(var(--accent-rgb),0.3)',
                }}
              >
                CPI: {education.cpi}
              </span>
            </div>
          </Tilt3D>
        </motion.div>

        {/* Achievements */}
        <div className="flex flex-col gap-4">
          {achievements.map(({ icon, title, detail, link }, i) => {
            const inner = (
              <Tilt3D max={7} className="panel group flex items-center gap-4 px-5 py-4">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                  {icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="mono mt-0.5 text-xs text-muted">{detail}</p>
                </div>
                {link && (
                  <HiExternalLink
                    size={16}
                    className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </Tilt3D>
            );

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="[perspective:1100px]"
              >
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
