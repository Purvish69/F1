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

export function GlassTitleCard({ children, className = '', isBoosted = false }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div
      className={`rb-glass-title-card ${isHovered ? 'is-hovered' : ''} ${isBoosted ? 'is-boosted' : ''} ${className}`}
      style={{
        '--glass-x': `${mousePos.x}%`,
        '--glass-y': `${mousePos.y}%`
      }}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
    >
      <div className="glass-hud-bracket corner-tl" aria-hidden="true" />
      <div className="glass-hud-bracket corner-tr" aria-hidden="true" />
      <div className="glass-hud-bracket corner-br" aria-hidden="true" />
      <div className="glass-hud-bracket corner-bl" aria-hidden="true" />
      <div className="glass-glare-effect" aria-hidden="true" />
      <div className="glass-carbon-mesh" aria-hidden="true" />
      <div className="glass-inner-content">
        {children}
      </div>
    </div>
  );
}

export function F1RevLights({ boosted = false }) {
  const [rpm, setRpm] = useState(11500);
  const [activeCount, setActiveCount] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      if (boosted) {
        setRpm(15000);
        setActiveCount(15);
      } else {
        const targetRpm = Math.floor(9500 + Math.random() * 4500);
        setRpm(targetRpm);
        setActiveCount(Math.min(15, Math.floor(((targetRpm - 9000) / 5500) * 15)));
      }
    }, boosted ? 120 : 380);
    return () => clearInterval(interval);
  }, [boosted]);

  const leds = [
    { type: 'green', id: 0 }, { type: 'green', id: 1 }, { type: 'green', id: 2 }, { type: 'green', id: 3 }, { type: 'green', id: 4 },
    { type: 'red', id: 5 }, { type: 'red', id: 6 }, { type: 'red', id: 7 }, { type: 'red', id: 8 }, { type: 'red', id: 9 },
    { type: 'blue', id: 10 }, { type: 'blue', id: 11 }, { type: 'blue', id: 12 }, { type: 'blue', id: 13 }, { type: 'blue', id: 14 }
  ];

  return (
    <div className={`f1-rev-counter ${boosted ? 'rev-boosted' : ''}`}>
      <div className="rev-hud-label">
        <span className="rpm-text">{rpm.toLocaleString()} <i>RPM</i></span>
        <span className="gear-indicator">{boosted ? '8TH · ⚡ OVERRIDE' : '7TH GEAR · DRS ON'}</span>
      </div>
      <div className="rev-led-bar">
        {leds.map((led, index) => {
          const isActive = index < activeCount;
          return (
            <span
              key={led.id}
              className={`rev-led led-${led.type} ${isActive ? 'is-active' : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function TitaniumSparks({ active = true }) {
  if (!active) return null;
  return (
    <div className="titanium-sparks-container" aria-hidden="true">
      <span className="spark spark-1" />
      <span className="spark spark-2" />
      <span className="spark spark-3" />
      <span className="spark spark-4" />
      <span className="spark spark-5" />
      <span className="spark spark-6" />
      <span className="spark spark-7" />
    </div>
  );
}

export function AeroSpeedStreaks({ boosted = false }) {
  return (
    <div className={`rb-aero-streaks ${boosted ? 'streaks-boosted' : ''}`} aria-hidden="true">
      <span className="streak streak-1" />
      <span className="streak streak-2" />
      <span className="streak streak-3" />
      <span className="streak streak-4" />
      <span className="streak streak-5" />
      <span className="streak streak-6" />
    </div>
  );
}

export function RacingGrid() { return <div className="rb-racing-grid" aria-hidden="true" />; }
