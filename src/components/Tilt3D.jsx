import { useRef } from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Cursor-driven 3D tilt card. Sets CSS variables (--rx/--ry/--s for tilt,
 * --mx/--my for the spotlight, --gx/--gy for the glare) on pointer move.
 * Wrap in a parent that has a `perspective`. Falls back to a flat card
 * when the user prefers reduced motion.
 */
const Tilt3D = ({ children, className = '', max = 9, scale = 1.02, glare = true }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty('--s', String(scale));
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--s', '1');
  };

  if (reduced()) {
    return <div className={`glow-card ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt3d glow-card ${className}`}
    >
      {children}
      {glare && <span className="tilt-glare" aria-hidden />}
    </div>
  );
};

export default Tilt3D;
