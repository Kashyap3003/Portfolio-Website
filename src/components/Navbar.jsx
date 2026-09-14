import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
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
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="section-container">
        <nav
          className={`flex items-center justify-between transition-all duration-350 ${
            scrolled
              ? 'mt-3 h-14 rounded-2xl border border-hairline bg-[var(--surface)] px-3 shadow-[0_20px_48px_-20px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:px-5'
              : 'mt-0 h-16 border border-transparent px-0'
          }`}
          style={scrolled ? { backdropFilter: 'blur(32px) saturate(1.6)' } : {}}
        >
          {/* ── Logo / monogram ──────────────────────────────────── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
            data-cursor="hover"
          >
            {/* Gradient ring monogram */}
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.15), rgba(var(--accent-2-rgb),0.1))',
                border: '1px solid rgba(var(--accent-rgb),0.35)',
                boxShadow: '0 0 0 0 rgba(var(--accent-rgb),0.3)',
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 16px -4px rgba(var(--accent-rgb),0.5)';
                e.currentTarget.style.transform = 'rotate(-6deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 0 rgba(var(--accent-rgb),0.3)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <span className="mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>KA</span>
            </span>
            <span className="hidden font-display text-[0.9rem] font-bold tracking-tight sm:block">
              Kashyap Ajudiya
            </span>
          </button>

          {/* ── Desktop links ─────────────────────────────────────── */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    data-cursor="hover"
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(var(--accent-rgb),0.09)' }}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3.5 right-3.5 h-px rounded-full"
                        style={{ background: 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Controls ──────────────────────────────────────────── */}
          <div className="flex items-center gap-1.5">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-cursor="hover"
              className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg text-muted transition-all duration-200 hover:bg-[rgba(var(--accent-rgb),0.08)] hover:text-accent"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              data-cursor="hover"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:bg-[rgba(var(--accent-rgb),0.08)] hover:text-accent md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="section-container mt-2 md:hidden"
          >
            <div
              className="rounded-2xl border border-hairline p-2 shadow-2xl backdrop-blur-2xl"
              style={{ background: 'var(--surface-solid)' }}
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(href)}
                  data-cursor="hover"
                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === href.slice(1)
                      ? 'text-accent'
                      : 'text-muted hover:text-ink'
                  }`}
                  style={
                    activeSection === href.slice(1)
                      ? { background: 'rgba(var(--accent-rgb),0.09)' }
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
