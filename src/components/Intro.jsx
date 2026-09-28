import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';

// Canvas 60fps/120fps GPU Particle Wind-Tunnel Engine
function CanvasAeroParticles({ active = true, rpmRatio = 0.2 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = Math.min(60, Math.floor(width / 22));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 180 + 80,
      baseSpeed: Math.random() * 12 + 8,
      opacity: Math.random() * 0.65 + 0.2,
      thickness: Math.random() * 1.8 + 0.6,
      color: Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : (Math.random() > 0.5 ? 'rgba(232, 0, 45, ' : 'rgba(255, 215, 0, ')
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const speedMultiplier = 1 + rpmRatio * 3.5;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.baseSpeed * speedMultiplier;
        if (p.x - p.length > width) {
          p.x = -p.length - Math.random() * 100;
          p.y = Math.random() * height;
        }

        const gradient = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.7, `${p.color}${p.opacity * 0.4})`);
        gradient.addColorStop(1, `${p.color}${p.opacity})`);

        ctx.beginPath();
        ctx.lineWidth = p.thickness * (1 + rpmRatio * 0.4);
        ctx.strokeStyle = gradient;
        ctx.moveTo(p.x - p.length, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, rpmRatio]);

  return <canvas ref={canvasRef} className="intro-canvas-aero" aria-hidden="true" />;
}

function Intro() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(0); // 0: init, 1..5: lights 1..5 red, 6: LIGHTS OUT!
  const [rpm, setRpm] = useState(0);

  const overlayRef = useRef(null);
  const centerStageRef = useRef(null);
  const shockwaveRef = useRef(null);
  const hudTopRef = useRef(null);
  const logoRef = useRef(null);
  const gantryRef = useRef(null);
  const timelineRef = useRef(null);

  const handleSkip = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.25,
        ease: 'power2.inOut',
        onComplete: () => setVisible(false)
      });
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    // Scoped GSAP Context for 100% safe DOM element targeting
    const ctx = gsap.context(() => {
      const rpmObj = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              scale: 1.05,
              duration: 0.35,
              ease: 'power3.inOut',
              onComplete: () => setVisible(false)
            });
          } else {
            setVisible(false);
          }
        }
      });

      timelineRef.current = tl;

      // Entrance Animations
      if (hudTopRef.current) {
        tl.fromTo(hudTopRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' });
      }
      if (logoRef.current) {
        tl.fromTo(logoRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.3)' }, '-=0.2');
      }
      if (gantryRef.current) {
        tl.fromTo(gantryRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.2');
      }

      // Stage 1: Light 1 Red (3,500 RPM)
      tl.to(rpmObj, {
        val: 3500,
        duration: 0.28,
        ease: 'power2.out',
        onUpdate: () => setRpm(Math.floor(rpmObj.val)),
        onStart: () => setStage(1)
      });

      // Stage 2: Light 2 Red (7,000 RPM)
      tl.to(rpmObj, {
        val: 7000,
        duration: 0.28,
        ease: 'power2.out',
        onUpdate: () => setRpm(Math.floor(rpmObj.val)),
        onStart: () => setStage(2)
      });

      // Stage 3: Light 3 Red (10,500 RPM)
      tl.to(rpmObj, {
        val: 10500,
        duration: 0.28,
        ease: 'power2.out',
        onUpdate: () => setRpm(Math.floor(rpmObj.val)),
        onStart: () => setStage(3)
      });

      // Stage 4: Light 4 Red (13,200 RPM)
      tl.to(rpmObj, {
        val: 13200,
        duration: 0.28,
        ease: 'power2.out',
        onUpdate: () => setRpm(Math.floor(rpmObj.val)),
        onStart: () => setStage(4)
      });

      // Stage 5: Light 5 Red (15,000 MAX RPM) + Engine Vibration
      tl.to(rpmObj, {
        val: 15000,
        duration: 0.32,
        ease: 'power3.out',
        onUpdate: () => setRpm(Math.floor(rpmObj.val)),
        onStart: () => {
          setStage(5);
          if (centerStageRef.current) {
            gsap.to(centerStageRef.current, {
              x: '+=1.2',
              y: '-=1.2',
              duration: 0.04,
              repeat: 10,
              yoyo: true,
              ease: 'none'
            });
          }
        }
      });

      // Hold RPM before launch
      tl.to({}, { duration: 0.55 });

      // Stage 6: LIGHTS OUT & AWAY WE GO!
      tl.add(() => {
        setStage(6);
        if (shockwaveRef.current) {
          gsap.fromTo(
            shockwaveRef.current,
            { scale: 0.2, opacity: 1 },
            { scale: 3.8, opacity: 0, duration: 0.7, ease: 'expo.out' }
          );
        }
      });

      tl.to({}, { duration: 0.6 });
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  const totalLeds = 15;
  const activeLedsCount = Math.min(15, Math.floor((rpm / 15000) * 15));
  const rpmRatio = rpm / 15000;

  return (
    <AnimatePresence>
      {visible && (
        <div
          ref={overlayRef}
          className="race-intro-overlay"
          aria-label="Introducción F1 Data Garage"
        >
          {/* Canvas GPU Particles */}
          <CanvasAeroParticles active={visible} rpmRatio={rpmRatio} />

          {/* Sci-Fi Grid & Cyber Core */}
          <div className="intro-bg-grid" />
          <div className={`intro-glow-core ${stage === 5 ? 'core-max-rev' : ''} ${stage === 6 ? 'core-launch' : ''}`} />
          <div className="intro-carbon-pattern" />

          {/* GSAP Shockwave Flare on Lights Out */}
          <div ref={shockwaveRef} className="intro-shockwave" style={{ opacity: 0 }} />

          {/* Skip Intro Button */}
          <button
            type="button"
            className="intro-skip-btn"
            onClick={handleSkip}
            title="Saltar intro (ESC)"
          >
            <span>SALTAR INTRO</span>
            <span className="skip-key">ESC</span>
          </button>

          {/* Top Telemetry HUD Header */}
          <div ref={hudTopRef} className="intro-hud-top">
            <div className="intro-hud-live-tag">
              <span className="intro-live-dot" /> FIA F1™ TELEMETRY ENGINE · GSAP &amp; MOTION
            </div>

            {/* Steering Wheel LED Shift Light Bar */}
            <div className="intro-shift-bar-container">
              <span className="shift-lbl">REV</span>
              <div className="shift-leds">
                {Array.from({ length: totalLeds }).map((_, i) => {
                  const isActive = i < activeLedsCount;
                  let colorClass = 'led-green';
                  if (i >= 5 && i < 10) colorClass = 'led-red';
                  if (i >= 10) colorClass = 'led-blue';
                  return (
                    <span
                      key={i}
                      className={`shift-led ${colorClass} ${isActive ? 'is-active' : ''} ${
                        stage === 5 ? 'pulse-max' : ''
                      }`}
                    />
                  );
                })}
              </div>
              <span className="shift-val">{rpm.toLocaleString()} RPM</span>
            </div>

            <div className="intro-hud-status-badge">
              MODE: <span className="highlight-mode">{stage === 6 ? 'LAUNCH' : 'STAGE'}</span>
            </div>
          </div>

          {/* Center Stage */}
          <div ref={centerStageRef} className="intro-center-stage">
            {/* Holographic F1 Silhouette Watermark */}
            <div className="intro-car-silhouette">
              <svg viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10,80 L60,80 L90,65 L150,60 L230,45 L320,45 L380,55 L440,55 L470,70 L490,70 L490,85 L440,90 L360,92 L200,92 L100,90 L10,85 Z"
                  stroke="rgba(0, 210, 190, 0.35)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <circle cx="90" cy="85" r="16" stroke="rgba(232, 0, 45, 0.45)" strokeWidth="2" />
                <circle cx="410" cy="85" r="18" stroke="rgba(232, 0, 45, 0.45)" strokeWidth="2" />
              </svg>
            </div>

            {/* High-Tech Holographic F1 DATA GARAGE Title Badge */}
            <div ref={logoRef} className="intro-logo-container">
              <div className="logo-hud-tag">
                <span className="hud-corner-dot" />
                <span className="hud-tag-text">2026 FIA OFFICIAL ENGINE</span>
              </div>

              <div className="intro-logo-badge">
                <div className="intro-f1-emblem">
                  <span>F1</span>
                  <div className="emblem-shine" />
                  <div className="emblem-glow-ring" />
                </div>

                <h1 className="intro-mark-title">
                  <span className="title-data">DATA</span>
                  <span className="intro-highlight">GARAGE</span>
                </h1>
              </div>

              <div className="logo-speedlines-bottom" aria-hidden="true" />
            </div>

            <p className="intro-subtitle">
              2026 AERODYNAMIC &amp; TELEMETRY ENGINE
            </p>

            {/* F1 Gantry Start Lights */}
            <div ref={gantryRef} className="f1-gantry-container">
              <div className="gantry-top-bar" />
              <div className="gantry-light-boxes">
                {[1, 2, 3, 4, 5].map((index) => {
                  const isRed = stage >= index && stage < 6;
                  return (
                    <div
                      key={index}
                      className={`gantry-box ${isRed ? 'is-red' : ''}`}
                    >
                      <div className={`gantry-bulb ${isRed ? 'bulb-active' : ''}`} />
                      <div className={`gantry-bulb ${isRed ? 'bulb-active' : ''}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lights Out & Status Banner */}
            <div className="intro-status-banner">
              {stage < 5 && (
                <div className="intro-status-text">
                  <span className="status-dot" /> INICIALIZANDO UNIDAD DE POTENCIA 2026...
                </div>
              )}
              {stage === 5 && (
                <div className="intro-status-ready">
                  ⚡ REVOLUCIONES MÁXIMAS · PREPARANDO SALIDA
                </div>
              )}
              {stage === 6 && (
                <motion.div
                  className="intro-lights-out-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: [0.85, 1.12, 1] }}
                  transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                >
                  <span className="text-lights">LIGHTS OUT</span>
                  <span className="text-away">AND AWAY WE GO! 🏁</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Telemetry HUD Line */}
          <div className="intro-hud-bottom">
            <div className="hud-metric">
              <span className="hud-lbl">NEUMÁTICOS</span>
              <span className="hud-val">{stage >= 5 ? '104°C' : `${40 + stage * 12}°C`}</span>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">TURBO BOOST</span>
              <span className="hud-val">{stage >= 5 ? '4.8 BAR' : `${(stage * 0.9).toFixed(1)} BAR`}</span>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">BATERÍA ERS</span>
              <div className="ers-bar-wrap">
                <div
                  className="ers-bar-fill"
                  style={{ width: `${Math.min(100, stage * 20)}%` }}
                />
              </div>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">MODO AERO</span>
              <span className="hud-val highlight">Z-MODE (HIGH DF)</span>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">CONTROL DE SALIDA</span>
              <span className={`hud-val ${stage === 6 ? 'green' : 'amber'}`}>
                {stage === 6 ? 'ACTIVO' : 'EN ESPERA'}
              </span>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Intro;
