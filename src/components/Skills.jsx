import { motion } from 'framer-motion';
import {
  HiCode, HiServer, HiCubeTransparent, HiCloud,
  HiDatabase, HiCog,
} from 'react-icons/hi';
import { skillGroups } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Marquee from './Marquee';
import Tilt3D from './Tilt3D';

/* Category → icon + accent color mapping */
const CATEGORY_META = {
  Frontend:      { icon: <HiCode size={20} />,            tint: '167,139,250' },
  Backend:       { icon: <HiServer size={20} />,           tint: '45,212,191'  },
  Architecture:  { icon: <HiCubeTransparent size={20} />,  tint: '56,189,248'  },
  'Cloud & Infra': { icon: <HiCloud size={20} />,          tint: '14,165,233'  },
  Databases:     { icon: <HiDatabase size={20} />,         tint: '190,242,100' },
  Tools:         { icon: <HiCog size={20} />,               tint: '251,191,36'  },
};

const allSkills = skillGroups.flatMap((g) => g.items);

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Skills = () => (
  <section id="skills" className="border-y border-hairline py-28 sm:py-32">
    <div className="section-container">
      <SectionTitle
        index="02"
        eyebrow="Toolkit"
        title="Technical Skills"
        subtitle="Technologies and tools I work with every day"
      />
    </div>

    {/* ── 3-D marquee conveyor ─────────────────────────────────── */}
    <div className="mb-16 [perspective:700px]">
      <div className="flex flex-col gap-3 [transform:rotateX(14deg)]">
        <Marquee items={allSkills} />
        <Marquee items={[...allSkills].reverse()} reverse />
      </div>
    </div>

    {/* ── Skill group cards ─────────────────────────────────────── */}
    <div className="section-container">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map(({ category, colorClass, bgClass, borderClass, items }, i) => {
          const meta = CATEGORY_META[category] || {};
          const tint = meta.tint || '45,212,191';
          const num  = String(i + 1).padStart(2, '0');

          return (
            <motion.div key={category} variants={item} className="[perspective:1100px]">
              <Tilt3D className="panel group flex h-full flex-col gap-6 p-6 sm:p-7">
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: -8, scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border"
                      style={{
                        color: `rgb(${tint})`,
                        background: `rgba(${tint},0.1)`,
                        borderColor: `rgba(${tint},0.22)`,
                      }}
                    >
                      {meta.icon}
                    </motion.div>
                    <span className="eyebrow">{category}</span>
                  </div>
                  {/* Ordinal */}
                  <span className="mono text-xs text-muted opacity-50">{num}</span>
                </div>

                {/* Accent line */}
                <div
                  className="h-px w-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, rgba(${tint},0.5), rgba(${tint},0.12), transparent)`,
                  }}
                />

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="chip"
                      data-cursor="hover"
                      style={{ '--chip-tint': tint }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Skill count */}
                <div className="mt-auto flex items-center gap-2 border-t border-hairline pt-4">
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(items.length, 8) }).map((_, dot) => (
                      <motion.span
                        key={dot}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: dot * 0.04 + 0.1, type: 'spring', stiffness: 360, damping: 20 }}
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: `rgba(${tint},${dot < 5 ? 0.6 : 0.25})` }}
                      />
                    ))}
                  </div>
                  <span className="mono text-[0.65rem] text-muted opacity-60">
                    {items.length} {items.length === 1 ? 'skill' : 'skills'}
                  </span>
                </div>
              </Tilt3D>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Skills;
