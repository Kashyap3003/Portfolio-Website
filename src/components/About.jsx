import { motion } from 'framer-motion';
import { HiCode, HiViewGrid, HiCloud } from 'react-icons/hi';
import { FiMapPin, FiDownload } from 'react-icons/fi';
import { aboutText, personal } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Tilt3D from './Tilt3D';
import Reveal from './Reveal';

const EXPERTISE = [
  {
    icon: <HiCode size={22} />,
    tint: '45,212,191',
    title: 'Full Stack Engineering',
    description:
      'Building end-to-end web applications with .NET Core, Angular, and REST APIs — from workflow UIs to production APIs, SQL Server, and Dockerized deployments.',
    tags: ['.NET Core', 'Angular', 'REST APIs', 'SQL Server', 'Docker'],
  },
  {
    icon: <HiViewGrid size={22} />,
    tint: '56,189,248',
    title: 'Workflow Systems',
    description:
      'Designing schema-driven forms, multi-tenant case management, and rule-based work queues that adapt UI and process behavior to workflow state.',
    tags: ['Workflow Engine', 'Multi-Tenant', 'Dynamic Forms', 'Work Queues'],
  },
  {
    icon: <HiCloud size={22} />,
    tint: '167,139,250',
    title: 'Cloud & Integrations',
    description:
      'Delivering event-driven Azure systems with Service Bus and Functions, plus config-driven ETL pipelines deployed across dozens of live locations.',
    tags: ['Microsoft Azure', 'Azure Service Bus', 'Azure Functions', 'ETL'],
  },
];

const TAGS = ['.NET Full Stack', 'Angular', 'Workflow Systems', 'Azure Cloud', 'REST APIs'];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => (
  <section id="about" className="py-28 sm:py-32">
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
        {/* ── Bio tile ─────────────────────────────────────────── */}
        <motion.div variants={item} className="[perspective:1100px] md:col-span-2">
          <Tilt3D max={5} className="panel flex h-full flex-col gap-7 p-7 sm:p-8">
            {/* Quote mark decoration */}
            <div
              aria-hidden
              className="font-display text-[4rem] leading-none font-extrabold"
              style={{ color: 'rgba(var(--accent-rgb),0.15)', marginBottom: '-1.5rem', lineHeight: 1 }}
            >
              "
            </div>
            <p className="text-[1.05rem] leading-[1.78] text-ink sm:text-[1.1rem]">{aboutText}</p>
            <div className="mt-auto flex flex-wrap gap-2 border-t border-hairline pt-5">
              {TAGS.map((t) => (
                <span key={t} className="chip" data-cursor="hover">{t}</span>
              ))}
            </div>
          </Tilt3D>
        </motion.div>

        {/* ── Identity tile ────────────────────────────────────── */}
        <motion.div variants={item} className="[perspective:1100px]">
          <Tilt3D className="panel flex h-full flex-col items-start gap-5 p-7 sm:p-8">

            {/* Avatar with animated gradient ring */}
            <div className="relative">
              {/* Animated outer glow ring */}
              <motion.span
                className="absolute rounded-2xl"
                style={{
                  inset: '-3px',
                  background:
                    'conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent))',
                  opacity: 0.6,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner mask to create ring effect */}
              <span
                className="absolute rounded-[14px]"
                style={{
                  inset: '1px',
                  background: 'var(--ground)',
                  zIndex: 1,
                }}
              />
              <img
                src={personal.avatar}
                alt="Kashyap Ajudiya"
                className="relative h-20 w-20 rounded-2xl object-cover"
                style={{ zIndex: 2 }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl font-extrabold tracking-tight">
                {personal.name}
              </h3>
              <p className="text-sm font-medium text-accent">{personal.role}</p>
              <p className="mono mt-1 flex items-center gap-1.5 text-xs text-muted">
                <FiMapPin size={11} style={{ color: 'var(--accent)' }} />
                {personal.location}
              </p>
            </div>

            {/* Download resume link */}
            <a
              href={personal.resumeFile}
              download
              data-cursor="hover"
              className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-muted transition-colors hover:text-accent"
            >
              <FiDownload size={13} />
              Download CV
            </a>
          </Tilt3D>
        </motion.div>

        {/* ── Expertise tiles ───────────────────────────────────── */}
        {EXPERTISE.map(({ icon, tint, title, description, tags }) => (
          <motion.div key={title} variants={item} className="[perspective:1100px]">
            <Tilt3D className="panel group flex h-full flex-col gap-5 p-7 sm:p-8">
              {/* Icon */}
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                style={{
                  color: `rgb(${tint})`,
                  background: `rgba(${tint},0.1)`,
                  borderColor: `rgba(${tint},0.25)`,
                  boxShadow: `0 8px 24px -8px rgba(${tint},0)`,
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 24px -8px rgba(${tint},0.45)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 24px -8px rgba(${tint},0)`;
                }}
              >
                {icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display text-base font-bold tracking-tight">{title}</h3>
                <p className="text-sm leading-[1.7] text-muted">{description}</p>
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
