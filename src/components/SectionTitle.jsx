import { motion } from 'framer-motion';
import Reveal from './Reveal';

/**
 * Editorial section header.
 * - Oversized watermark index number as background decoration
 * - Animated expanding line between index and eyebrow
 * - 3-D flip-up display title
 * - Optional subtitle with scroll-reveal
 */
const SectionTitle = ({ index, eyebrow, title, subtitle, align = 'left' }) => {
  const centered = align === 'center';

  return (
    <div className={`relative ${centered ? 'mx-auto mb-20 max-w-2xl text-center' : 'mb-20 max-w-4xl'}`}>

      {/* Watermark index */}
      {index && (
        <span
          aria-hidden
          className="text-watermark pointer-events-none absolute select-none"
          style={{
            fontSize: 'clamp(6rem, 18vw, 11rem)',
            top: '-0.25em',
            right: centered ? 'auto' : '-0.5rem',
            left: centered ? '50%' : 'auto',
            transform: centered ? 'translateX(-50%)' : 'none',
            opacity: 1,
          }}
        >
          {index}
        </span>
      )}

      {/* Eyebrow row */}
      <Reveal className={`relative mb-6 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        {index && (
          <span className="mono text-[0.65rem] font-semibold" style={{ color: 'var(--accent)', opacity: 0.7 }}>
            {index}
          </span>
        )}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-10 origin-left"
          style={{ background: 'rgba(var(--accent-rgb), 0.45)' }}
        />
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      </Reveal>

      {/* Display title — 3D flip */}
      <div style={{ perspective: 1000 }}>
        <motion.h2
          initial={{ opacity: 0, rotateX: -75, y: 10 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'bottom center' }}
          className="relative font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <Reveal
          as="p"
          delay={0.14}
          className={`mt-4 text-[1rem] leading-relaxed text-muted ${centered ? 'mx-auto' : ''} max-w-lg`}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
};

export default SectionTitle;
