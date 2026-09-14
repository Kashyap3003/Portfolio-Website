import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { personal } from '../data/resumeData';

const Footer = () => (
  <footer className="relative z-10 border-t border-hairline py-10">
    {/* Gradient top edge */}
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(var(--accent-rgb),0.45) 30%, rgba(var(--accent-2-rgb),0.3) 70%, transparent 100%)',
      }}
    />

    <div className="section-container">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

        {/* ── Left: copy + monogram ─────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Tiny monogram */}
          <span
            className="mono hidden h-7 w-7 items-center justify-center rounded-lg text-[0.65rem] font-semibold sm:flex"
            style={{
              color: 'var(--accent)',
              background: 'rgba(var(--accent-rgb),0.09)',
              border: '1px solid rgba(var(--accent-rgb),0.22)',
            }}
          >
            KA
          </span>
          <p className="mono text-center text-[0.72rem] text-muted sm:text-left">
            © {new Date().getFullYear()} Kashyap Ajudiya
            <span className="mx-1.5 opacity-40">·</span>
            Engineering full-stack systems that scale, perform and last.
          </p>
        </div>

        {/* ── Right: social + back-to-top ───────────────────── */}
        <div className="flex items-center gap-2">
          {[
            { href: personal.github,           icon: <FiGithub   size={17} />, label: 'GitHub'   },
            { href: personal.linkedin,         icon: <FiLinkedin size={17} />, label: 'LinkedIn' },
            { href: `mailto:${personal.email}`, icon: <FiMail    size={17} />, label: 'Email'    },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-cursor="hover"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
            >
              {icon}
            </motion.a>
          ))}

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            data-cursor="hover"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-muted transition-colors hover:border-[rgba(var(--accent-rgb),0.35)] hover:text-accent"
          >
            <FiArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
