const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

// Pure-CSS 3D wireframe "node cube" — auto-rotates in real 3D space.
const Cube3D = ({ size = 240, className = '' }) => (
  <div
    aria-hidden
    className={`cube-scene ${className}`}
    style={{ width: size, height: size, '--cz': `${size / 2}px` }}
  >
    <div className="cube">
      {FACES.map((f) => (
        <span key={f} className={`cube-face cube-${f}`} />
      ))}
    </div>
  </div>
);

export default Cube3D;
