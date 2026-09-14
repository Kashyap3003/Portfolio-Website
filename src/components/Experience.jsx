import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { experience } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

/* First letter of company name for timeline node */
const companyInitial = (name) => name.charAt(0).toUpperCase();

const Experience = () => (
  <section id="experience" className="border-y border-hairline py-28 sm:py-32">
    <div className="section-container">
      <SectionTitle
        index="04"
        eyebrow="Career"
        title="Experience"
        subtitle="Where I've worked and what I've achieved"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* ── Timeline spine ──────────────────────────────────── */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-4 left-[22px] top-4 hidden w-px origin-top sm:block"
          style={{
            background:
              'linear-gradient(to bottom, var(--accent), rgba(var(--accent-2-rgb),0.6) 50%, transparent)',
          }}
          aria-hidden
        />

        <div className="flex flex-col gap-10">
          {experience.map((job, i) => {
            const isCurrent = i === 0;

            return (
              <motion.div
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative sm:pl-18"
                style={{ paddingLeft: undefined }}
              >
                <div className="relative sm:pl-[4.5rem]">
                  {/* ── Timeline node ───────────────────────── */}
                  <div className="absolute left-0 top-5 z-10 hidden sm:block">
                    {/* Pulse ring for current role */}
                    {isCurrent && (
                      <motion.span
                        className="absolute rounded-xl"
                        style={{
                          inset: '-5px',
                          background: 'rgba(var(--accent-rgb),0.2)',
                          borderRadius: '14px',
                        }}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden
                      />
                    )}

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 340,
                        damping: 20,
                        delay: i * 0.08 + 0.22,
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background: isCurrent
                          ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
                          : 'linear-gradient(135deg, rgba(var(--accent-rgb),0.35), rgba(var(--accent-2-rgb),0.25))',
                        color: isCurrent ? 'var(--on-accent)' : 'var(--accent)',
                        boxShadow: isCurrent
                          ? '0 0 0 4px var(--ground), 0 8px 24px -8px rgba(var(--accent-rgb),0.55)'
                          : '0 0 0 4px var(--ground), 0 4px 14px -6px rgba(var(--accent-rgb),0.3)',
                        border: isCurrent ? 'none' : '1px solid rgba(var(--accent-rgb),0.35)',
                      }}
                    >
                      <span className="font-display text-sm font-bold">
                        {companyInitial(job.company)}
                      </span>
                    </motion.div>
                  </div>

                  {/* ── Job card ────────────────────────────── */}
                  <div className="[perspective:1100px]">
                    <Tilt3D max={4} className={`panel group p-6 sm:p-7 ${isCurrent ? 'panel-accent-top' : ''}`}>

                      {/* Header */}
                      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                        <div className="flex flex-col gap-0.5">
                          {/* Current badge */}
                          {isCurrent && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ type: 'spring', stiffness: 360, damping: 22, delay: 0.3 }}
                              className="mb-2"
                            >
                              <span className="badge-live">
                                <span
                                  className="inline-block h-1.5 w-1.5 rounded-full"
                                  style={{ background: 'var(--accent)' }}
                                />
                                Current
                              </span>
                            </motion.div>
                          )}

                          <h3 className="font-display text-lg font-extrabold tracking-tight">
                            {job.title}
                          </h3>
                          <p className="text-sm font-semibold text-accent">{job.company}</p>
                          <p className="mono mt-0.5 text-[0.7rem] text-muted">{job.location}</p>
                        </div>

                        {/* Period + type badge */}
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <span className="mono text-xs font-medium text-muted">{job.period}</span>
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[0.66rem] font-semibold"
                            style={
                              job.type === 'Full-time'
                                ? {
                                    color: 'var(--accent)',
                                    background: 'rgba(var(--accent-rgb),0.1)',
                                    border: '1px solid rgba(var(--accent-rgb),0.28)',
                                  }
                                : {
                                    color: 'var(--accent-2)',
                                    background: 'rgba(var(--accent-2-rgb),0.1)',
                                    border: '1px solid rgba(var(--accent-2-rgb),0.28)',
                                  }
                            }
                          >
                            {job.type}
                          </span>
                        </div>
                      </div>

                      {/* Separator */}
                      <div
                        className="mb-5 h-px w-full"
                        style={{
                          background: isCurrent
                            ? 'linear-gradient(90deg, rgba(var(--accent-rgb),0.3), transparent)'
                            : 'var(--hairline)',
                        }}
                      />

                      {/* Bullets */}
                      <motion.ul
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.07 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-3"
                      >
                        {job.bullets.map((bullet, j) => (
                          <motion.li
                            key={j}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            className="flex gap-3 text-sm leading-[1.7] text-muted"
                          >
                            <span
                              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:scale-150"
                              style={{
                                background: isCurrent
                                  ? 'var(--accent)'
                                  : 'rgba(var(--accent-rgb),0.5)',
                              }}
                            />
                            {bullet}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </Tilt3D>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
