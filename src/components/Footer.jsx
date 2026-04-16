import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personal } from '../data/resumeData';

const Footer = () => (
  <footer className="border-t border-gray-200 dark:border-white/10 py-8">
    <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
        © {new Date().getFullYear()} Kashyap Ajudiya · Built with React & Tailwind CSS
      </p>

      <div className="flex items-center gap-3">
        {[
          { href: personal.github,   icon: <FiGithub size={18} />,   label: 'GitHub' },
          { href: personal.linkedin, icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
          { href: `mailto:${personal.email}`, icon: <FiMail size={18} />, label: 'Email' },
        ].map(({ href, icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-gray-400 dark:text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
