import { motion } from 'framer-motion';
import { HiAcademicCap, HiExternalLink } from 'react-icons/hi';
import { education, achievements } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

const Education = () => (
  <section id="education" className="py-28 sm:py-32">
    <div className="section-container">
      <SectionTitle
        index="05"
        eyebrow="Education"
        title="Education & Achievements"
        subtitle="Academic background and notable accomplishments"
      />

      <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">

        {/* ── Education card ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="[perspective:1100px]"
        >
          <Tilt3D className="panel group flex h-full flex-col p-7 sm:p-8">
            {/* Accent top line */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.55), rgba(var(--accent-2-rgb),0.35), transparent)',
              }}
            />

            <div className="mb-6 flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-400 group-hover:scale-110 group-hover:-rotate-6"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: 'var(--on-accent)',
                  boxShadow: '0 8px 24px -8px rgba(var(--accent-rgb),0.55)',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <HiAcademicCap size={22} />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-display text-lg font-extrabold tracking-tight">
                  {education.degree}
                </h3>
                <p className="text-sm font-semibold text-accent">{education.school}</p>
                <p className="mono mt-0.5 text-[0.7rem] text-muted">{education.location}</p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-hairline pt-5">
              <span className="mono text-sm text-muted">{education.graduation}</span>
              <span
                className="mono rounded-lg px-3 py-1 text-sm font-bold"
                style={{
                  color: 'var(--accent)',
                  background: 'rgba(var(--accent-rgb),0.1)',
                  border: '1px solid rgba(var(--accent-rgb),0.28)',
                }}
              >
                CPI {education.cpi}
              </span>
            </div>
          </Tilt3D>
        </motion.div>

        {/* ── Achievements ────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {achievements.map(({ icon, title, detail, link }, i) => {
            const Inner = (
              <Tilt3D max={7} className="panel group flex items-center gap-4 px-5 py-4">
                {/* Emoji icon */}
                <motion.span
                  whileHover={{ scale: 1.3, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                  className="shrink-0 text-2xl"
                >
                  {icon}
                </motion.span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="mono mt-0.5 text-[0.7rem] text-muted">{detail}</p>
                </div>

                {link && (
                  <motion.span
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="shrink-0 text-accent"
                  >
                    <HiExternalLink size={16} />
                  </motion.span>
                )}
              </Tilt3D>
            );

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="[perspective:1100px]"
              >
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="block">
                    {Inner}
                  </a>
                ) : (
                  Inner
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
