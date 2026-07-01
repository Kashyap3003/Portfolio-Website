import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { personal } from '../data/resumeData';
import SectionTitle from './SectionTitle';
import Magnetic from './Magnetic';
import Tilt3D from './Tilt3D';

const CONTACT_LINKS = [
  { icon: <FiMail size={18} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: <FiPhone size={18} />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
  { icon: <FiGithub size={18} />, label: 'GitHub', value: 'kashyapajudiya', href: personal.github },
  { icon: <FiLinkedin size={18} />, label: 'LinkedIn', value: 'Kashyap Ajudiya', href: personal.linkedin },
  { icon: <FiMapPin size={18} />, label: 'Location', value: personal.location, href: null },
];

const Contact = () => (
  <section id="contact" className="border-t border-hairline py-24 sm:py-28">
    <div className="section-container">
      <SectionTitle
        index="06"
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="I'm always open to interesting roles and collaborations"
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Statement + primary CTA */}
        <div className="flex flex-col gap-7">
          <p className="max-w-md leading-relaxed text-muted">
            Whether you have an opportunity, a question, or just want to connect — my inbox is always open.
            I'll get back to you as soon as possible.
          </p>

          <Magnetic strength={0.25}>
            <a
              href={`mailto:${personal.email}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 font-display text-xl font-extrabold tracking-tight text-ink transition-colors hover:text-accent sm:text-2xl"
            >
              <span className="break-all">{personal.email}</span>
              <FiArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" size={24} />
            </a>
          </Magnetic>

          <div className="flex items-center gap-2">
            {[
              { href: personal.github, icon: <FiGithub size={18} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
              { href: `mailto:${personal.email}`, icon: <FiMail size={18} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="hover"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline text-muted transition-all duration-200 hover:text-accent"
                >
                  {icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* Contact directory */}
        <div className="[perspective:1200px]">
          <Tilt3D max={5} className="panel p-3">
            {CONTACT_LINKS.map(({ icon, label, value, href }, i) => {
              const row = (
                <>
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover/row:scale-110 group-hover/row:rotate-3"
                    style={{
                      color: 'var(--accent)',
                      background: 'rgba(var(--accent-rgb),0.1)',
                      border: '1px solid rgba(var(--accent-rgb),0.25)',
                    }}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="mono text-[0.65rem] uppercase tracking-widest text-muted">{label}</p>
                    <p className="truncate text-sm font-medium text-ink transition-colors group-hover/row:text-accent">
                      {value}
                    </p>
                  </div>
                </>
              );
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="group/row flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-[rgba(var(--accent-rgb),0.06)]"
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="group/row flex items-center gap-4 rounded-2xl px-4 py-3">{row}</div>
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
