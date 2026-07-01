import { motion } from 'framer-motion';
import { skillGroups } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Marquee from './Marquee';
import Tilt3D from './Tilt3D';

const allSkills = skillGroups.flatMap((g) => g.items);

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Skills = () => (
  <section id="skills" className="border-y border-hairline py-24 sm:py-28">
    <div className="section-container">
      <SectionTitle
        index="02"
        eyebrow="Toolkit"
        title="Technical Skills"
        subtitle="Technologies and tools I work with every day"
      />
    </div>

    {/* 3D marquee conveyor */}
    <div className="mb-14 [perspective:700px]">
      <div className="flex flex-col gap-3 [transform:rotateX(16deg)]">
        <Marquee items={allSkills} />
        <Marquee items={[...allSkills].reverse()} reverse />
      </div>
    </div>

    <div className="section-container">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map(({ category, items }, i) => (
          <motion.div key={category} variants={item} className="[perspective:1100px]">
            <Tilt3D className="panel h-full p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="eyebrow">{category}</span>
                <span className="mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="chip" data-cursor="hover">{skill}</span>
                ))}
              </div>
            </Tilt3D>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;
