import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Generative "event stream" field — packets flow along curved connections
 * between hub nodes, echoing event-driven / distributed-systems work.
 * Canvas-rendered, DPR-aware, pauses off-screen and respects reduced motion.
 */
const EventStream = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    const palette = isDark
      ? { accent: [45, 212, 191], spark: [190, 242, 100], sky: [56, 189, 248] }
      : { accent: [13, 148, 136], spark: [77, 124, 15], sky: [2, 132, 199] };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let hubs = [];
    let links = [];
    let raf = null;
    let visible = true;

    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const build = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 640 ? 6 : w < 1024 ? 9 : 12;
      hubs = Array.from({ length: count }, (_, i) => ({
        x: (0.08 + 0.84 * ((i % 4) / 3)) * w + (Math.random() - 0.5) * 60,
        y: (0.12 + 0.76 * (Math.floor(i / 4) / Math.max(1, Math.ceil(count / 4) - 1))) * h
          + (Math.random() - 0.5) * 50,
        r: 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        drift: 0.4 + Math.random() * 0.5,
      }));

      // connect each hub to a couple of others (bias rightward = data flow)
      links = [];
      hubs.forEach((a, i) => {
        const targets = hubs
          .map((b, j) => ({ b, j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
          .filter((t) => t.j !== i && t.b.x >= a.x - 40)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2);
        targets.forEach(({ j }) => {
          const a2 = hubs[i], b2 = hubs[j];
          const cx = (a2.x + b2.x) / 2 + (Math.random() - 0.5) * 120;
          const cy = (a2.y + b2.y) / 2 + (Math.random() - 0.5) * 120;
          links.push({
            a: i, b: j, cx, cy,
            packets: Array.from({ length: 1 + (Math.random() < 0.4 ? 1 : 0) }, () => ({
              t: Math.random(),
              speed: 0.0016 + Math.random() * 0.0026,
              spark: Math.random() < 0.18,
              size: 1.6 + Math.random() * 1.8,
            })),
          });
        });
      });
    };

    const bez = (p0, p1, p2, t) => {
      const u = 1 - t;
      return u * u * p0 + 2 * u * t * p1 + t * t * p2;
    };

    const drawFrame = (time) => {
      ctx.clearRect(0, 0, w, h);

      // gentle hub drift
      hubs.forEach((hub) => {
        hub.ox = hub.x + Math.sin(time * 0.0004 * hub.drift + hub.phase) * 10;
        hub.oy = hub.y + Math.cos(time * 0.00035 * hub.drift + hub.phase) * 10;
      });

      // connections
      ctx.lineWidth = 1;
      links.forEach((link) => {
        const a = hubs[link.a], b = hubs[link.b];
        ctx.beginPath();
        ctx.moveTo(a.ox, a.oy);
        ctx.quadraticCurveTo(link.cx, link.cy, b.ox, b.oy);
        ctx.strokeStyle = rgba(palette.accent, isDark ? 0.1 : 0.14);
        ctx.stroke();

        // packets
        link.packets.forEach((pk) => {
          if (!reduce) {
            pk.t += pk.speed;
            if (pk.t > 1) pk.t -= 1;
          }
          const x = bez(a.ox, link.cx, b.ox, pk.t);
          const y = bez(a.oy, link.cy, b.oy, pk.t);
          const col = pk.spark ? palette.spark : palette.accent;
          ctx.beginPath();
          ctx.arc(x, y, pk.size, 0, Math.PI * 2);
          ctx.fillStyle = rgba(col, 0.95);
          ctx.shadowColor = rgba(col, 0.9);
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // hubs
      hubs.forEach((hub) => {
        const pulse = (Math.sin(time * 0.002 + hub.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(hub.ox, hub.oy, hub.r + 5 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(palette.sky, 0.12 + pulse * 0.12);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(hub.ox, hub.oy, hub.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(palette.accent, 0.9);
        ctx.fill();
      });
    };

    const loop = (time) => {
      drawFrame(time);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) drawFrame(0);
    });
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduce && raf == null) raf = requestAnimationFrame(loop);
        if (!visible && raf != null) { cancelAnimationFrame(raf); raf = null; }
      },
      { threshold: 0 }
    );
    io.observe(parent);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
};

export default EventStream;
