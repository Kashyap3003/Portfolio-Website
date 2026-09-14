import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiLightBulb, HiCode, HiChartBar } from 'react-icons/hi';
import { projects } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

const SPECS = [
  { key: 'problem',  label: 'Problem',  icon: <HiLightBulb size={14} />, tint: '251,191,36'  },
  { key: 'solution', label: 'Solution', icon: <HiCode      size={14} />, tint: '45,212,191'  },
  { key: 'impact',   label: 'Impact',   icon: <HiChartBar  size={14} />, tint: '167,139,250' },
];

const ProjectCard = ({ project, idx }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const numY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const num   = String(idx + 1).padStart(2, '0');

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1300px]"
    >
      <Tilt3D max={4} className="panel relative overflow-hidden p-7 sm:p-10">
        {/* Accent top border gradient */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(var(--accent-rgb),0.7) 30%, rgba(var(--accent-2-rgb),0.5) 70%, transparent 100%)',
          }}
        />

        {/* Giant parallax number */}
        <motion.span
          style={{ y: numY, fontSize: 'clamp(7rem, 18vw, 13rem)' }}
          aria-hidden
          className="text-outline pointer-events-none absolute -top-6 right-0 select-none font-display font-extrabold leading-none"
        >
          {num}
        </motion.span>

        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* ── Identity ─────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            {project.featured && (
              <span
                className="mono inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-medium"
                style={{
                  color:      'var(--accent)',
                  background: 'rgba(var(--accent-rgb),0.1)',
                  border:     '1px solid rgba(var(--accent-rgb),0.28)',
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ●
                </motion.span>{' '}
                Featured
              </span>
            )}

            <div>
              <span className="mono text-sm font-medium text-accent opacity-70">{num} —</span>
              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="chip" data-cursor="hover">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-auto flex items-center gap-6 pt-2">
              {project.github && project.github !== '#' ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
                >
                  <FiGithub
                    size={15}
                    className="transition-transform group-hover/link:-translate-y-0.5"
                  />
                  GitHub
                </a>
              ) : (
                <span className="mono inline-flex items-center gap-2 text-sm text-muted opacity-50">
                  <FiGithub size={15} /> Private
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
                >
                  <FiExternalLink
                    size={15}
                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* ── Spec sheet ───────────────────────────────────── */}
          <div className="flex flex-col gap-3.5">
            {SPECS.map(({ key, label, icon, tint }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-hairline bg-[rgba(var(--accent-rgb),0.02)] p-4 transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.2)] hover:bg-[rgba(var(--accent-rgb),0.04)]"
                style={{ borderLeft: `2px solid rgba(${tint},0.55)` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span style={{ color: `rgb(${tint})` }}>{icon}</span>
                  <span
                    className="mono text-[0.64rem] font-semibold uppercase tracking-widest"
                    style={{ color: `rgb(${tint})` }}
                  >
                    {label}
                  </span>
                </div>
                <p className="text-sm leading-[1.7] text-muted">{project[key]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Tilt3D>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="py-28 sm:py-32">
    <div className="section-container">
      <SectionTitle
        index="03"
        eyebrow="Selected Work"
        title="Projects"
        subtitle="Real problems solved with measurable outcomes"
      />

      <div className="flex flex-col gap-7">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
