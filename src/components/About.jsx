import { motion } from 'framer-motion';
import { HiCode, HiViewGrid, HiCloud } from 'react-icons/hi';
import { aboutText, personal } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';

const EXPERTISE = [
  {
    icon: <HiCode size={24} />,
    tint: '45,212,191',
    title: 'Full Stack Engineering',
    description:
      'Building end-to-end web applications with .NET Core, Angular, and REST APIs — from workflow UIs to production APIs, SQL Server, and Dockerized deployments.',
    tags: ['.NET Core', 'Angular', 'REST APIs', 'SQL Server', 'Docker'],
  },
  {
    icon: <HiViewGrid size={24} />,
    tint: '56,189,248',
    title: 'Workflow Systems',
    description:
      'Designing schema-driven forms, multi-tenant case management, and rule-based work queues that adapt UI and process behavior to workflow state.',
    tags: ['Workflow Engine', 'Multi-Tenant', 'Dynamic Forms', 'Work Queues'],
  },
  {
    icon: <HiCloud size={24} />,
    tint: '190,242,100',
    title: 'Cloud & Integrations',
    description:
      'Delivering event-driven Azure systems with Service Bus and Functions, plus config-driven ETL pipelines deployed across dozens of live locations.',
    tags: ['Microsoft Azure', 'Azure Service Bus', 'Azure Functions', 'ETL'],
  },
];

const TAGS = ['.NET Full Stack', 'Angular', 'Workflow Systems', 'Azure Cloud', 'REST APIs'];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => (
  <section id="about" className="py-24 sm:py-28">
    <div className="section-container">
      <SectionTitle
        index="01"
        eyebrow="About"
        title="About Me"
        subtitle="A quick look at who I am and what I bring to the table"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-5 md:grid-cols-3"
      >
        {/* Bio tile */}
        <motion.div variants={item} className="[perspective:1100px] md:col-span-2">
          <Tilt3D max={6} className="panel flex h-full flex-col justify-between gap-6 p-7">
            <p className="text-lg leading-relaxed text-ink">{aboutText}</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="chip" data-cursor="hover">{t}</span>
              ))}
            </div>
          </Tilt3D>
        </motion.div>

        {/* Identity tile */}
        <motion.div variants={item} className="[perspective:1100px]">
          <Tilt3D className="panel flex h-full flex-col items-start gap-4 p-7">
            <div className="relative">
              <span className="absolute inset-0 rounded-2xl animate-pulse-ring" style={{ background: 'rgba(var(--accent-rgb),0.4)' }} />
              <img
                src={personal.avatar}
                alt="Kashyap Ajudiya"
                className="relative h-20 w-20 rounded-2xl object-cover"
                style={{ boxShadow: '0 0 0 2px rgba(var(--accent-rgb),0.5)' }}
              />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">{personal.name}</h3>
              <p className="text-sm text-accent">{personal.role}</p>
              <p className="mono mt-2 text-xs text-muted">◉ {personal.location}</p>
            </div>
          </Tilt3D>
        </motion.div>

        {/* Expertise tiles */}
        {EXPERTISE.map(({ icon, tint, title, description, tags }) => (
          <motion.div key={title} variants={item} className="[perspective:1100px]">
            <Tilt3D className="panel group flex h-full flex-col gap-5 p-7">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                style={{
                  color: `rgb(${tint})`,
                  background: `rgba(${tint},0.12)`,
                  borderColor: `rgba(${tint},0.28)`,
                }}
              >
                {icon}
              </div>
              <div>
                <h3 className="mb-2 font-display text-base font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-2 border-t border-hairline pt-4">
                {tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </Tilt3D>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;
