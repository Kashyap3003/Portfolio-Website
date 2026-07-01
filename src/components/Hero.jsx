import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personal, stats, experience } from '../data/resumeData';
import Magnetic from './Magnetic';
import EventStream from './EventStream';
import Counter from './Counter';
import Cube3D from './Cube3D';

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const lineReveal = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const SPRING = { stiffness: 60, damping: 14, mass: 0.4 };

const Hero = () => {
  const current = experience[0];

  // 3D pointer parallax for the hero text block
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-9, 9]), SPRING);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [7, -7]), SPRING);

  const onPointer = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    mvX.set(e.clientX / window.innerWidth - 0.5);
    mvY.set(e.clientY / window.innerHeight - 0.5);
  };

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      onMouseMove={onPointer}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Generative event-stream field */}
      <div className="absolute inset-0">
        <EventStream />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--ground) 0%, color-mix(in srgb, var(--ground) 55%, transparent) 46%, transparent 80%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--ground))' }}
        />
      </div>

      {/* 3D node cube */}
      <div className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 animate-float opacity-90 lg:block">
        <Cube3D size={300} />
      </div>

      <div className="section-container relative z-10 w-full py-20" style={{ perspective: 1300 }}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* Status line */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mb-7 flex flex-wrap items-center gap-3"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
              style={{
                borderColor: 'rgba(var(--accent-rgb),0.3)',
                background: 'rgba(var(--accent-rgb),0.07)',
                color: 'var(--accent)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: 'var(--accent)', opacity: 0.7 }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
              </span>
              Available for opportunities
            </span>
            <span className="eyebrow hidden sm:block">// {personal.role} · Event-Driven Systems</span>
          </motion.div>

          {/* Name — masked line reveal, pushed forward in 3D */}
          <motion.h1
            variants={lineContainer}
            initial="hidden"
            animate="visible"
            style={{ z: 60 }}
            className="font-display text-[3.4rem] font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} className="block">Kashyap</motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineReveal} className="block text-signal animate-gradient-pan">
                Ajudiya
              </motion.span>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            style={{ z: 40 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {personal.tagline}
          </motion.p>

          {/* Currently */}
          <motion.p
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.58 }}
            className="mono mt-4 text-sm text-muted"
          >
            <span className="text-accent">▹</span> Currently {current.title} @ {current.company}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.66 }}
            style={{ z: 50 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button onClick={scrollToProjects} className="btn-primary" data-cursor="hover">
                View Work <HiArrowDown size={16} />
              </button>
            </Magnetic>
            <Magnetic>
              <a href={personal.resumeFile} download className="btn-ghost" data-cursor="hover">
                Download Resume <HiDownload size={16} />
              </a>
            </Magnetic>

            <div className="ml-1 flex items-center gap-2">
              {[
                { href: personal.github, icon: <FiGithub size={18} />, label: 'GitHub' },
                { href: personal.linkedin, icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
                { href: `mailto:${personal.email}`, icon: <FiMail size={18} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-cursor="hover"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline text-muted transition-all duration-200 hover:text-accent"
                  >
                    {icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Telemetry strip */}
          <motion.dl
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
            initial="hidden"
            animate="visible"
            style={{ z: 30, background: 'var(--hairline)' }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline sm:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fade}
                className="flex flex-col gap-1 p-4"
                style={{ background: 'var(--ground)' }}
              >
                <dd className="font-display text-2xl font-extrabold text-signal sm:text-3xl">
                  <Counter value={s.value} />
                </dd>
                <dt className="mono text-[0.68rem] leading-tight text-muted">{s.label}</dt>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
        aria-label="Scroll to about"
        data-cursor="hover"
      >
        <span className="mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-current p-1">
          <motion.span
            animate={{ y: [0, 11, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-current"
          />
        </span>
      </motion.button>
    </section>
  );
};

export default Hero;
