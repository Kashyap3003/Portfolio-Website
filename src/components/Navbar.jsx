import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="section-container">
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'mt-3 h-14 rounded-2xl border border-hairline bg-[var(--surface)] px-3 backdrop-blur-xl sm:px-4'
              : 'mt-0 h-16 border border-transparent px-0'
          }`}
        >
          {/* Monogram */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span
              className="mono flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-300 group-hover:-rotate-6"
              style={{
                borderColor: 'rgba(var(--accent-rgb),0.5)',
                color: 'var(--accent)',
                background: 'rgba(var(--accent-rgb),0.08)',
              }}
            >
              KA
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight sm:block">
              Kashyap Ajudiya
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                        style={{ background: 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg text-muted transition-all duration-200 hover:scale-110 hover:text-accent"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:text-accent md:hidden"
            >
              {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="section-container mt-2 md:hidden"
          >
            <div className="rounded-2xl border border-hairline bg-[var(--surface-solid)] p-2 shadow-xl">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={() => scrollTo(href)}
                  className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    activeSection === href.slice(1)
                      ? 'text-accent'
                      : 'text-muted hover:text-ink'
                  }`}
                  style={
                    activeSection === href.slice(1)
                      ? { background: 'rgba(var(--accent-rgb),0.1)' }
                      : undefined
                  }
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
