import { motion } from 'framer-motion';
import Reveal from './Reveal';

/**
 * Editorial section header: mono index + eyebrow on a hairline row,
 * then an oversized display title that flips up in 3D, and optional subtitle.
 */
const SectionTitle = ({ index, eyebrow, title, subtitle, align = 'left' }) => (
  <div className={align === 'center' ? 'mx-auto mb-14 max-w-2xl text-center' : 'mb-14 max-w-3xl'}>
    <Reveal className={`mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
      {index && <span className="mono text-sm font-medium text-accent">{index}</span>}
      <span className="h-px w-10" style={{ background: 'rgba(var(--accent-rgb), 0.5)' }} />
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    </Reveal>
    <div style={{ perspective: 900 }}>
      <motion.h2
        initial={{ opacity: 0, rotateX: -78, y: 8 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'bottom center' }}
        className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
    {subtitle && (
      <Reveal
        as="p"
        delay={0.12}
        className={`mt-4 text-lg text-muted ${align === 'center' ? 'mx-auto' : ''} max-w-xl`}
      >
        {subtitle}
      </Reveal>
    )}
  </div>
);

export default SectionTitle;
