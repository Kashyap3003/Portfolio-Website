import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { personal } from '../data/resumeData';

const Footer = () => (
  <footer className="relative z-10 border-t border-hairline py-10">
    <div
      className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2"
      style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
    />

    <div className="section-container flex flex-col items-center justify-between gap-5 sm:flex-row">
      <p className="mono text-center text-xs text-muted">
        © {new Date().getFullYear()} Kashyap Ajudiya · Built with React &amp; Tailwind CSS
      </p>

      <div className="flex items-center gap-2">
        {[
          { href: personal.github, icon: <FiGithub size={18} />, label: 'GitHub' },
          { href: personal.linkedin, icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
          { href: `mailto:${personal.email}`, icon: <FiMail size={18} />, label: 'Email' },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-cursor="hover"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
          >
            {icon}
          </a>
        ))}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          data-cursor="hover"
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-hairline text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
        >
          <FiArrowUp size={16} />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
