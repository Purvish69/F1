import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Intro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState(0); // 0: init, 1..5: lights 1..5 red, 6: lights out!
  const [rpm, setRpm] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      const timeout = window.setTimeout(() => setVisible(false), 120);
      return () => window.clearTimeout(timeout);
    }

    const t1 = setTimeout(() => { setStage(1); setRpm(3500); }, 450);
    const t2 = setTimeout(() => { setStage(2); setRpm(7200); }, 700);
    const t3 = setTimeout(() => { setStage(3); setRpm(10400); }, 950);
    const t4 = setTimeout(() => { setStage(4); setRpm(13100); }, 1200);
    const t5 = setTimeout(() => { setStage(5); setRpm(15000); }, 1450);
    const t6 = setTimeout(() => { setStage(6); setRpm(15000); }, 2150);
    const tExit = setTimeout(() => setVisible(false), 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tExit);
    };
  }, [reduceMotion]);

  if (!visible) return null;

  // 15 LED Shift lights calculation
  const totalLeds = 15;
  const activeLedsCount = Math.min(15, Math.floor((rpm / 15000) * 15));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="race-intro-overlay"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.12, filter: 'blur(16px)' }
          }
          transition={{ duration: reduceMotion ? 0.12 : 0.45, ease: 'easeInOut' }}
          aria-label="Introducción F1 Data Garage"
        >
          {/* Background Sci-Fi Grid & Cyber Core */}
          <div className="intro-bg-grid" />
          <div className={`intro-glow-core ${stage === 5 ? 'core-max-rev' : ''} ${stage === 6 ? 'core-launch' : ''}`} />
          <div className="intro-carbon-pattern" />

          {/* Animated Aero Streamlines behind center stage */}
          {!reduceMotion && (
            <div className="intro-aero-particles">
              {[...Array(12)].map((_, i) => (
                <span key={i} className={`aero-line line-${i % 4}`} />
              ))}
            </div>
          )}

          {/* Shockwave Flare on Lights Out */}
          {stage === 6 && !reduceMotion && (
            <>
              <motion.div
                className="intro-shockwave"
                initial={{ opacity: 1, scale: 0.2 }}
                animate={{ opacity: 0, scale: 3.5 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              />
              <motion.div
                className="intro-warp-streaks"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 1, 0.8, 0], scale: [0.7, 1.5, 2.2] }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
              />
            </>
          )}

          {/* Top Telemetry HUD Header */}
          <motion.div
            className="intro-hud-top"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="intro-hud-live-tag">
              <span className="intro-live-dot" /> FIA F1™ TELEMETRY
            </div>

            {/* F1 Steering Wheel LED Shift Light Bar */}
            <div className="intro-shift-bar-container">
              <span className="shift-lbl">REV</span>
              <div className="shift-leds">
                {[...Array(totalLeds)].map((_, i) => {
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
          </motion.div>

          {/* Center Stage with optional engine shake on stage 5 */}
          <motion.div
            className="intro-center-stage"
            animate={
              stage === 5 && !reduceMotion
                ? { x: [-1.5, 1.5, -2, 2, -1, 1, 0], y: [1, -1, 1.5, -1.5, 0] }
                : { x: 0, y: 0 }
            }
            transition={{ repeat: stage === 5 ? Infinity : 0, duration: 0.08 }}
          >
            {/* Holographic F1 Silhouette Watermark */}
            <div className="intro-car-silhouette">
              <svg viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10,80 L60,80 L90,65 L150,60 L230,45 L320,45 L380,55 L440,55 L470,70 L490,70 L490,85 L440,90 L360,92 L200,92 L100,90 L10,85 Z"
                  stroke="rgba(0, 210, 190, 0.25)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <circle cx="90" cy="85" r="16" stroke="rgba(232, 0, 45, 0.35)" strokeWidth="2" />
                <circle cx="410" cy="85" r="18" stroke="rgba(232, 0, 45, 0.35)" strokeWidth="2" />
              </svg>
            </div>

            {/* Title / Logo Badge */}
            <motion.div
              className="intro-logo-badge"
              initial={{ opacity: 0, y: -25, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="intro-f1-emblem">
                <span>F1</span>
                <div className="emblem-shine" />
              </div>
              <div className="intro-mark-title">
                DATA <span className="intro-highlight">GARAGE</span>
              </div>
            </motion.div>

            <motion.p
              className="intro-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              2026 AERODYNAMIC &amp; TELEMETRY ENGINE
            </motion.p>

            {/* Realistic F1 Gantry Start Lights */}
            <motion.div
              className="f1-gantry-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="gantry-top-bar" />
              <div className="gantry-light-boxes">
                {[1, 2, 3, 4, 5].map((index) => {
                  const isRed = stage >= index && stage < 6;
                  return (
                    <motion.div
                      key={index}
                      className={`gantry-box ${isRed ? 'is-red' : ''}`}
                      animate={isRed ? { scale: [1, 1.04, 1] } : {}}
                      transition={{ duration: 0.15 }}
                    >
                      <div className={`gantry-bulb ${isRed ? 'bulb-active' : ''}`} />
                      <div className={`gantry-bulb ${isRed ? 'bulb-active' : ''}`} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Lights Out & Status Banner */}
            <div className="intro-status-banner">
              {stage < 5 && (
                <motion.div
                  className="intro-status-text"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                >
                  <span className="status-dot" /> WARMING UP POWER UNIT...
                </motion.div>
              )}
              {stage === 5 && (
                <motion.div
                  className="intro-status-ready"
                  animate={{ scale: [1, 1.08, 1], filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'] }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                >
                  ⚡ HOLD RPM · PREPARE LAUNCH
                </motion.div>
              )}
              {stage === 6 && (
                <motion.div
                  className="intro-lights-out-text"
                  initial={{ opacity: 0, scale: 0.4, rotateX: -30 }}
                  animate={{ opacity: 1, scale: [0.7, 1.15, 1], rotateX: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                >
                  <span className="text-lights">LIGHTS OUT</span>
                  <span className="text-away">AND AWAY WE GO!</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Bottom Telemetry HUD Line */}
          <motion.div
            className="intro-hud-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="hud-metric">
              <span className="hud-lbl">TYRE TEMP</span>
              <span className="hud-val">{stage >= 5 ? '104°C' : `${40 + stage * 12}°C`}</span>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">TURBO BOOST</span>
              <span className="hud-val">{stage >= 5 ? '4.8 BAR' : `${(stage * 0.9).toFixed(1)} BAR`}</span>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">ERS BATTERY</span>
              <div className="ers-bar-wrap">
                <div
                  className="ers-bar-fill"
                  style={{ width: `${Math.min(100, stage * 20)}%` }}
                />
              </div>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">AERO MODE</span>
              <span className="hud-val highlight">Z-MODE (HIGH DF)</span>
            </div>
            <div className="hud-metric">
              <span className="hud-lbl">LAUNCH CONTROL</span>
              <span className={`hud-val ${stage === 6 ? 'green' : 'amber'}`}>
                {stage === 6 ? 'ACTIVE' : 'ENGAGED'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Intro;
