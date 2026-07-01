import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// Standardized scroll-reveal wrapper used across sections.
const Reveal = ({
  children,
  as = 'div',
  delay = 0,
  y = 26,
  duration = 0.7,
  once = true,
  className = '',
  ...rest
}) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
