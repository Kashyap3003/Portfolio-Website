import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const CURTAIN_EASE = [0.87, 0, 0.13, 1];

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 2.5,
  drift: 15 + Math.random() * 35,
  dur: 3.5 + Math.random() * 5,
  delay: Math.random() * 4,
  opacity: 0.12 + Math.random() * 0.18,
}));

const Preloader = ({ onComplete }) => {
  const [done, setDone] = useState(false);
  const reduced = useRef(reducedMotion());

  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => Math.round(v));
  const barScaleX = useTransform(progress, (v) => v / 100);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const controls = animate(progress, 100, {
      duration: reduced.current ? 0.4 : 1.9,
      ease: [0.65, 0.05, 0.25, 1],
      onComplete: () => {
        window.setTimeout(
          () => {
            document.documentElement.style.overflow = prevOverflow;
            setDone(true);
            onComplete?.();
          },
          reduced.current ? 80 : 350,
        );
      },
    });

    return () => {
      controls.stop();
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          aria-busy="true"
          exit={
            reduced.current
              ? { opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }
              : { y: '-100%', transition: { duration: 0.95, ease: CURTAIN_EASE } }
          }
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--ground)' }}
        >
          {/* Atmospheric layers */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30" />

          {/* Floating particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              aria-hidden
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: `rgba(var(--accent-rgb), ${p.opacity})`,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, p.opacity, 0],
                y: [0, -p.drift, 0],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Bottom edge signal line */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--accent), #38bdf8, transparent)',
            }}
          />

          {/* Top edge signal line */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.3), transparent)',
            }}
          />

          <motion.div
            exit={{ opacity: 0, y: -28, transition: { duration: 0.3, ease: 'easeIn' } }}
            className="relative flex flex-col items-center px-6"
          >
            {/* Monogram */}
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <svg
                viewBox="0 0 96 96"
                fill="none"
                aria-hidden
                className="absolute inset-0 h-full w-full"
              >
                <motion.rect
                  x="2.5"
                  y="2.5"
                  width="91"
                  height="91"
                  rx="22"
                  stroke="rgba(var(--accent-rgb),0.55)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduced.current ? 0 : 1.5, ease: EASE }}
                />
                {/* Corner accents */}
                <motion.circle
                  cx="2.5" cy="2.5" r="2"
                  fill="rgba(var(--accent-rgb),0.6)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: reduced.current ? 0 : 1.2 }}
                />
                <motion.circle
                  cx="93.5" cy="2.5" r="2"
                  fill="#38bdf8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.4, delay: reduced.current ? 0 : 1.3 }}
                />
                <motion.circle
                  cx="2.5" cy="93.5" r="2"
                  fill="#38bdf8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.4, delay: reduced.current ? 0 : 1.35 }}
                />
                <motion.circle
                  cx="93.5" cy="93.5" r="2"
                  fill="rgba(var(--accent-rgb),0.6)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: reduced.current ? 0 : 1.4 }}
                />
              </svg>
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: reduced.current ? 0 : 0.35, ease: EASE }}
                className="mono text-xl font-semibold sm:text-2xl"
                style={{ color: 'var(--accent)' }}
              >
                KA
              </motion.span>
            </div>

            {/* Name */}
            <span className="mt-7 block overflow-hidden">
              <motion.span
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: reduced.current ? 0 : 0.25, ease: EASE }}
                className="block font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                Kashyap&nbsp;Ajudiya
              </motion.span>
            </span>

            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: reduced.current ? 0 : 0.65, ease: EASE }}
              className="mono mt-4 text-[0.68rem] tracking-[0.25em] text-muted"
            >
              // Software Engineer · .NET Full Stack
            </motion.span>

            {/* Progress line + counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: reduced.current ? 0 : 0.5 }}
              className="mt-9 w-56 sm:w-64"
            >
              <div
                className="h-px w-full overflow-hidden rounded-full"
                style={{ background: 'var(--hairline)' }}
              >
                <motion.div
                  style={{
                    scaleX: barScaleX,
                    transformOrigin: 'left',
                    background:
                      'linear-gradient(90deg, var(--accent), #38bdf8, var(--spark))',
                  }}
                  className="h-full w-full"
                />
              </div>
              <div className="mono mt-3 flex justify-center text-[0.68rem] tracking-[0.3em] text-muted">
                <motion.span>{counter}</motion.span>
                <span>%</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
