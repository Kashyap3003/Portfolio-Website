// Tracks the cursor inside a `.glow-card` and exposes its position as
// CSS variables (--mx / --my) so the spotlight gradient can follow it.
// Attach as: <div className="glow-card" onMouseMove={spotlightMove} />
export const spotlightMove = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
};
