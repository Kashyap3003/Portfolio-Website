import { motion, useScroll, useSpring } from 'framer-motion';

// Thin signal bar pinned to the top that fills as the page scrolls.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{
        scaleX,
        backgroundImage:
          'linear-gradient(90deg, var(--accent), #38bdf8, var(--spark))',
      }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left"
      aria-hidden
    />
  );
};

export default ScrollProgress;
