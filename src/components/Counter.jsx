import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Counts up to a numeric value (with any trailing suffix like "+") when scrolled in.
const Counter = ({ value, duration = 1.6, className = '' }) => {
  const str = String(value);
  const match = str.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const isNumeric = Boolean(match);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  // Deps are primitives only — `match` is a fresh array each render and must
  // NOT be a dependency, or the rAF restarts every frame and never finishes.
  useEffect(() => {
    if (!inView || !isNumeric) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, isNumeric]);

  return (
    <span ref={ref} className={className}>
      {isNumeric ? `${n}${suffix}` : str}
    </span>
  );
};

export default Counter;
