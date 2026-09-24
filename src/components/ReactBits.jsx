import { useEffect, useRef, useState } from 'react';

// Lightweight CSS/React adaptations of React Bits' Shiny Text, Count Up,
// Spotlight Card and Grid treatments. They avoid canvas/WebGL dependencies.
export function ShinyText({ children, className = '' }) {
  return <span className={`rb-shiny-text ${className}`}>{children}</span>;
}

export function CountUp({ value, duration = 850, className = '' }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef();
  useEffect(() => {
    if (!Number.isFinite(value)) return undefined;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [duration, value]);
  return <span className={className}>{display}</span>;
}

export function SpotlightCard({ children, className = '' }) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });
  return (
    <div className={`rb-spotlight-card ${className}`} style={{ '--spotlight-x': `${spotlight.x}%`, '--spotlight-y': `${spotlight.y}%` }} onPointerMove={(event) => {
      if (event.pointerType === 'touch') return;
      const box = event.currentTarget.getBoundingClientRect();
      setSpotlight({ x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 });
    }}>
      {children}
    </div>
  );
}

export function RacingGrid() { return <div className="rb-racing-grid" aria-hidden="true" />; }
