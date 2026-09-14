import { lazy, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personal, stats, experience } from '../data/resumeData';
import Magnetic from './Magnetic';
import EventStream from './EventStream';
import Counter from './Counter';

const HoloCore = lazy(() => import('./HoloCore'));

/* ── Animation variants ─────────────────────────────────────────── */
const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const lineReveal = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
};
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

const SPRING = { stiffness: 52, damping: 15, mass: 0.5 };

/* ── Hero ────────────────────────────────────────────────────────── */
const Hero = () => {
  const current = experience[0];

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-4, 4]), SPRING);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [3, -3]), SPRING);

  const onPointer = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    mvX.set(e.clientX / window.innerWidth - 0.5);
    mvY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="hero"
      onMouseMove={onPointer}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* ── Background field ──────────────────────────────────── */}
      <div className="absolute inset-0">
        <EventStream />
        {/* Gradient veil — left content fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--ground) 0%, color-mix(in srgb, var(--ground) 62%, transparent) 52%, transparent 88%)',
          }}
        />
        {/* Bottom fade to next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--ground))' }}
        />
      </div>

      {/* ── 3D network orb ───────────────────────────────────── */}
      <div
        className="pointer-events-none absolute right-[2%] top-1/2 hidden -translate-y-[52%] animate-float lg:block xl:right-[6%]"
        style={{ overflow: 'visible' }}
      >
        <Suspense fallback={<div style={{ width: 320, height: 320 }} />}>
          <HoloCore size={320} />
        </Suspense>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        className="section-container relative z-10 w-full py-28"
        style={{ perspective: 1400 }}
      >
        <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>

          {/* Status badge + eyebrow */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mb-9 flex flex-wrap items-center gap-3"
          >
            {/* Live badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide"
              style={{
                borderColor: 'rgba(var(--accent-rgb),0.35)',
                background:  'rgba(var(--accent-rgb),0.08)',
                color:       'var(--accent)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full animate-dot-ping"
                  style={{ background: 'var(--accent)', opacity: 0.6 }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              </span>
              Open to opportunities
            </span>
            <span className="eyebrow hidden sm:block" style={{ opacity: 0.55 }}>
              // {personal.role} · .NET Full Stack
            </span>
          </motion.div>

          {/* ── Name ─────────────────────────────────────────── */}
          <motion.h1
            variants={lineContainer}
            initial="hidden"
            animate="visible"
            className="font-display font-extrabold leading-[0.91] tracking-tight"
            style={{ fontSize: 'clamp(3.8rem, 9.5vw, 9rem)', zIndex: 60 }}
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} className="block">Kashyap</motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={lineReveal}
                className="block text-signal animate-gradient-pan"
              >
                Ajudiya
              </motion.span>
            </span>
          </motion.h1>

          {/* ── Tagline ──────────────────────────────────────── */}
          <motion.p
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="mt-7 max-w-[38rem] text-[1.05rem] leading-[1.75] text-muted sm:text-lg"
          >
            {personal.tagline}
          </motion.p>

          {/* ── Current role ─────────────────────────────────── */}
          <motion.p
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.65 }}
            className="mono mt-4 text-sm"
            style={{ color: 'var(--muted)' }}
          >
            <span style={{ color: 'var(--accent)' }}>▹</span>{' '}
            <span className="font-medium" style={{ color: 'var(--accent)' }}>
              {current.title}
            </span>{' '}
            @{' '}
            <span className="font-semibold" style={{ color: 'var(--text)' }}>
              {current.company}
            </span>
          </motion.p>

          {/* ── CTAs ─────────────────────────────────────────── */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.75 }}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-primary"
                data-cursor="hover"
              >
                View My Work <HiArrowDown size={15} />
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href={personal.resumeFile}
                download
                className="btn-ghost"
                data-cursor="hover"
              >
                Resume <HiDownload size={15} />
              </a>
            </Magnetic>

            {/* Social icon row */}
            <div className="ml-1 flex items-center gap-2">
              {[
                { href: personal.github,          icon: <FiGithub   size={17} />, label: 'GitHub'   },
                { href: personal.linkedin,         icon: <FiLinkedin size={17} />, label: 'LinkedIn' },
                { href: `mailto:${personal.email}`, icon: <FiMail     size={17} />, label: 'Email'    },
              ].map(({ href, icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-cursor="hover"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline text-muted transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.4)] hover:bg-[rgba(var(--accent-rgb),0.07)] hover:text-accent"
                  >
                    {icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* ── Stats ────────────────────────────────────────── */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.11, delayChildren: 1.0 } },
            }}
            initial="hidden"
            animate="visible"
            className="mt-18"
          >
            {/* Accent separator */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 h-px max-w-xl origin-left"
              style={{
                background:
                  'linear-gradient(90deg, rgba(var(--accent-rgb),0.55), rgba(var(--accent-2-rgb),0.28), transparent)',
              }}
            />

            <div className="grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
              {stats.map((s) => (
                <motion.div key={s.label} variants={fade} className="flex flex-col gap-2">
                  <dd
                    className="stat-value leading-none"
                    style={{ fontSize: 'clamp(2rem, 4.5vw, 2.8rem)' }}
                  >
                    <Counter value={s.value} />
                  </dd>
                  <dt className="mono text-[0.65rem] leading-tight text-muted tracking-wider uppercase">
                    {s.label}
                  </dt>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="mono text-[0.6rem] tracking-[0.22em] text-muted opacity-50">SCROLL</span>
          <div
            className="h-8 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(var(--accent-rgb),0.45), transparent)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
