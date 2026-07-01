import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { HiLightBulb, HiCode, HiChartBar } from 'react-icons/hi';
import { projects } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

const SPECS = [
  { key: 'problem', label: 'Problem', icon: <HiLightBulb size={15} />, tint: '234,179,8' },
  { key: 'solution', label: 'Solution', icon: <HiCode size={15} />, tint: '45,212,191' },
  { key: 'impact', label: 'Impact', icon: <HiChartBar size={15} />, tint: '190,242,100' },
];

const ProjectCard = ({ project, idx }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const numY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const num = String(idx + 1).padStart(2, '0');

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1300px]"
    >
      <Tilt3D max={5} className="panel relative overflow-hidden p-8 sm:p-10">
        {/* Giant parallax index */}
        <motion.span
          style={{ y: numY }}
          aria-hidden
          className="text-outline pointer-events-none absolute -top-8 right-0 select-none font-display text-[8rem] font-extrabold leading-none opacity-50 sm:text-[12rem]"
        >
          {num}
        </motion.span>

        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          {/* Identity */}
          <div className="flex flex-col gap-5">
            {project.featured && (
              <span
                className="mono inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-medium"
                style={{
                  color: 'var(--accent)',
                  background: 'rgba(var(--accent-rgb),0.1)',
                  border: '1px solid rgba(var(--accent-rgb),0.3)',
                }}
              >
                <span className="animate-pulse">●</span> Featured
              </span>
            )}
            <div>
              <span className="mono text-sm text-accent">{num} —</span>
              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="chip" data-cursor="hover">{t}</span>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-5 pt-2">
              {project.github && project.github !== '#' ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  <FiGithub size={16} className="transition-transform group-hover/link:-translate-y-0.5" />
                  GitHub
                </a>
              ) : (
                <span className="mono inline-flex items-center gap-2 text-sm text-muted opacity-60">
                  <FiGithub size={16} /> Private
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/link inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  <FiExternalLink size={16} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Spec sheet */}
          <div className="flex flex-col gap-3">
            {SPECS.map(({ key, label, icon, tint }) => (
              <div
                key={key}
                className="rounded-xl border border-hairline p-4 transition-colors"
                style={{ borderLeft: `2px solid rgba(${tint},0.6)` }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span style={{ color: `rgb(${tint})` }}>{icon}</span>
                  <span className="mono text-[0.68rem] uppercase tracking-widest" style={{ color: `rgb(${tint})` }}>
                    {label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{project[key]}</p>
              </div>
            ))}
          </div>
        </div>
      </Tilt3D>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="py-24 sm:py-28">
    <div className="section-container">
      <SectionTitle
        index="03"
        eyebrow="Selected Work"
        title="Projects"
        subtitle="Real problems solved with measurable outcomes"
      />

      <div className="flex flex-col gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
