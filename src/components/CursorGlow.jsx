import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Additive custom cursor: a snappy dot + a lagging ring that grows over
// interactive elements, plus an ambient gradient blob that drifts behind the
// content layer. Pointer-only; disabled on touch / reduced motion.
const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.4 });
  // Dreamy lag for the ambient glow — trails well behind the pointer.
  const blobX = useSpring(dotX, { stiffness: 42, damping: 18, mass: 1 });
  const blobY = useSpring(dotY, { stiffness: 42, damping: 18, mass: 1 });

  useEffect(() => {
    const fine =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add('cursor-none');

    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const interactive = e.target.closest?.(
        'a, button, [data-cursor="hover"], input, summary'
      );
      setHovering(Boolean(interactive));
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', downH);
    window.addEventListener('mouseup', upH);

    return () => {
      document.documentElement.classList.remove('cursor-none');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', downH);
      window.removeEventListener('mouseup', upH);
    };
  }, [dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient gradient blob — sits above the fixed background layers but
          below the content (z-10), so it washes softly through panels. Pure
          gradient falloff (no CSS blur) keeps it cheap to composite. */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="pointer-events-none fixed left-0 top-0 z-[5]"
        aria-hidden
      >
        <div
          className={`h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,transform] duration-700 ease-out ${
            hovering
              ? 'scale-110 opacity-[0.14] dark:opacity-[0.2]'
              : 'scale-100 opacity-[0.09] dark:opacity-[0.14]'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(var(--accent-rgb),0.75), rgba(56,189,248,0.35) 45%, transparent 70%)',
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        aria-hidden
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,opacity] duration-200 ease-out ${
            hovering
              ? 'h-12 w-12 bg-[rgba(var(--accent-rgb),0.12)]'
              : 'h-8 w-8 bg-transparent'
          } ${down ? 'scale-90' : ''}`}
          style={{ borderColor: 'var(--accent)' }}
        />
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        aria-hidden
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: hovering ? 0 : 6,
            height: hovering ? 0 : 6,
            backgroundColor: 'var(--accent)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CursorGlow;
