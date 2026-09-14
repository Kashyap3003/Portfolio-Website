import { motion, useScroll, useSpring } from 'framer-motion';

// Thin gradient signal bar pinned to the top, fills as the page scrolls.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 32,
    mass: 0.18,
  });

  return (
    <motion.div
      style={{
        scaleX,
        backgroundImage:
          'linear-gradient(90deg, var(--accent), var(--accent-2), var(--spark))',
      }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      aria-hidden
    />
  );
};

export default ScrollProgress;
