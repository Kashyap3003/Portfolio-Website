import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { experience } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

const Experience = () => (
  <section id="experience" className="border-y border-hairline py-24 sm:py-28">
    <div className="section-container">
      <SectionTitle
        index="04"
        eyebrow="Career"
        title="Experience"
        subtitle="Where I've worked and what I've achieved"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Timeline spine — draws in on scroll */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute bottom-2 left-[19px] top-2 hidden w-px origin-top sm:block"
          style={{ background: 'linear-gradient(var(--accent), #38bdf8, transparent)' }}
        />

        <div className="flex flex-col gap-8">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative sm:pl-16"
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 320, damping: 18, delay: i * 0.1 + 0.25 }}
                className="absolute left-0 top-5 z-10 hidden h-10 w-10 items-center justify-center rounded-xl sm:flex"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), #38bdf8)',
                  color: 'var(--on-accent)',
                  boxShadow: '0 0 0 5px var(--ground), 0 8px 24px -8px rgba(var(--accent-rgb),0.6)',
                }}
              >
                <HiBriefcase size={18} />
              </motion.div>

              <div className="[perspective:1100px]">
                <Tilt3D max={5} className="panel group p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold">{job.title}</h3>
                      <p className="text-sm font-semibold text-accent">{job.company}</p>
                      <p className="mono mt-0.5 text-xs text-muted">{job.location}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="mono text-xs font-medium text-muted">{job.period}</span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-medium"
                        style={
                          job.type === 'Full-time'
                            ? { color: 'var(--accent)', background: 'rgba(var(--accent-rgb),0.1)', border: '1px solid rgba(var(--accent-rgb),0.3)' }
                            : { color: '#38bdf8', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)' }
                        }
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-150"
                          style={{ background: 'var(--accent)' }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Tilt3D>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
