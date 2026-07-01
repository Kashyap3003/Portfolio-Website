import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

// Fixed vertical section navigator (desktop) — doubles as scroll progress.
const SideRail = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex flex-col items-end gap-4"
    >
      {SECTIONS.map(({ id, label }, i) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => go(id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`mono text-[0.7rem] tracking-widest transition-all duration-300 ${
                isActive
                  ? 'text-accent opacity-100'
                  : 'text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {String(i + 1).padStart(2, '0')} {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'h-2.5 w-2.5 bg-accent shadow-[0_0_12px_var(--accent)]'
                  : 'h-1.5 w-1.5 bg-hairline group-hover:bg-accent'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SideRail;
