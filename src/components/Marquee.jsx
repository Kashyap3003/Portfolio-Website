// Seamless infinite ticker — content is duplicated and translated -50%.
const Marquee = ({ items, reverse = false, className = '' }) => (
  <div className={`overflow-hidden mask-x ${className}`}>
    <div
      className={`flex w-max items-center gap-3 ${
        reverse ? 'animate-marquee-rev' : 'animate-marquee'
      } hover:[animation-play-state:paused]`}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="mono whitespace-nowrap rounded-lg border border-hairline px-4 py-2 text-sm text-muted"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
