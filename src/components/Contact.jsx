import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { personal } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Magnetic from './Magnetic';
import Tilt3D from './Tilt3D';
import Reveal from './Reveal';

const CONTACT_LINKS = [
  { icon: <FiMail   size={17} />, label: 'Email',    value: personal.email,       href: `mailto:${personal.email}` },
  { icon: <FiPhone  size={17} />, label: 'Phone',    value: personal.phone,       href: `tel:${personal.phone}` },
  { icon: <FiGithub size={17} />, label: 'GitHub',   value: '@Kashyap3003',       href: personal.github },
  { icon: <FiLinkedin size={17} />, label: 'LinkedIn', value: 'Kashyap Ajudiya', href: personal.linkedin },
  { icon: <FiMapPin size={17} />, label: 'Location', value: personal.location,    href: null },
];

const SOCIAL_ICONS = [
  { href: personal.github,           icon: <FiGithub   size={18} />, label: 'GitHub'   },
  { href: personal.linkedin,         icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
  { href: `mailto:${personal.email}`, icon: <FiMail    size={18} />, label: 'Email'    },
];

const Contact = () => (
  <section id="contact" className="border-t border-hairline py-28 sm:py-32">
    <div className="section-container">
      <SectionTitle
        index="06"
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="I'm always open to interesting roles and collaborations"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

        {/* ── Left: Statement + CTA ────────────────────────── */}
        <div className="flex flex-col gap-8">
          <Reveal as="p" className="max-w-md text-[1.05rem] leading-[1.78] text-muted">
            Whether you have an opportunity, a question, or just want to connect —
            my inbox is always open. I'll get back to you as soon as possible.
          </Reveal>

          {/* Large email CTA */}
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${personal.email}`}
              data-cursor="hover"
              className="group inline-flex items-start gap-3 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="mono text-[0.66rem] uppercase tracking-widest text-muted">
                  Say hello
                </span>
                <span
                  className="font-display font-extrabold tracking-tight text-ink transition-colors group-hover:text-accent"
                  style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', lineHeight: 1.15 }}
                >
                  {personal.email}
                </span>
              </div>
              <motion.span
                whileHover={{ x: 4, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="mt-5 shrink-0 text-accent transition-colors group-hover:text-accent"
              >
                <FiArrowUpRight size={26} />
              </motion.span>
            </a>
          </Magnetic>

          {/* Social buttons */}
          <div className="flex items-center gap-2">
            {SOCIAL_ICONS.map(({ href, icon, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-muted transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.4)] hover:bg-[rgba(var(--accent-rgb),0.07)] hover:text-accent"
                >
                  {icon}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Availability note */}
          <Reveal delay={0.2}>
            <div
              className="inline-flex items-center gap-2.5 rounded-xl border border-hairline px-4 py-3"
              style={{ background: 'rgba(var(--accent-rgb),0.04)' }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full animate-dot-ping"
                  style={{ background: 'var(--accent)', opacity: 0.5 }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              </span>
              <p className="mono text-xs text-muted">
                Currently open to full-time roles — response within 24h
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Right: Contact directory ─────────────────────── */}
        <div className="[perspective:1200px]">
          <Tilt3D max={4} className="panel p-2.5">
            {CONTACT_LINKS.map(({ icon, label, value, href }, i) => {
              const Row = (
                <>
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-350 group-hover/row:scale-110 group-hover/row:rotate-3"
                    style={{
                      color:       'var(--accent)',
                      background:  'rgba(var(--accent-rgb),0.09)',
                      border:      '1px solid rgba(var(--accent-rgb),0.2)',
                    }}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mono text-[0.62rem] uppercase tracking-widest text-muted">
                      {label}
                    </p>
                    <p className="truncate text-sm font-medium text-ink transition-colors group-hover/row:text-accent">
                      {value}
                    </p>
                  </div>
                  {href && (
                    <FiArrowUpRight
                      size={15}
                      className="shrink-0 text-muted opacity-0 transition-all duration-200 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:opacity-100 group-hover/row:text-accent"
                    />
                  )}
                </>
              );

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="group/row flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-[rgba(var(--accent-rgb),0.05)]"
                    >
                      {Row}
                    </a>
                  ) : (
                    <div className="group/row flex items-center gap-4 rounded-2xl px-4 py-3.5">
                      {Row}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </Tilt3D>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
