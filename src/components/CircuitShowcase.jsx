import { Box, Grid } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export const legendaryCircuits = [
  {
    id: 'monaco',
    number: '01',
    name: 'Circuito de Mónaco',
    trackName: 'Circuit de Monaco',
    city: 'Montecarlo',
    country: 'Mónaco',
    flag: '🇲🇨',
    tag: 'La Joya de la Corona',
    accentColor: '#E8002D',
    length: '3.337 km',
    turns: 19,
    drsZones: 1,
    topSpeed: '290 km/h',
    lapRecord: '1:12.909',
    recordHolder: 'L. Hamilton (2021)',
    firstGrandPrix: '1950',
    curvasIconicas: [
      { name: 'Sainte-Dévote (T1)', desc: 'Frenada brutal a final de recta', x: 395, y: 235 },
      { name: 'Horquilla Fairmont (Loews)', desc: 'La curva más lenta y famosa de la F1', x: 305, y: 120 },
      { name: 'El Túnel de Mónaco', desc: 'Aceleración a ciegas junto al puerto', x: 420, y: 95 },
      { name: 'Chicana de la Piscina', desc: 'Cambio de dirección al límite del asfalto', x: 105, y: 165 },
      { name: 'La Rascasse', desc: 'Entrada milimétrica a la recta de meta', x: 145, y: 250 }
    ],
    svgPath: 'M 170 270 L 330 270 C 365 270 385 255 395 235 C 405 210 395 185 370 175 L 330 165 C 310 155 300 140 305 120 C 310 95 335 85 365 90 L 420 100 C 445 105 465 90 465 65 C 465 40 440 25 405 25 L 265 25 C 225 25 195 45 180 80 L 150 135 C 140 155 125 165 105 165 C 80 165 60 180 60 205 C 60 230 80 250 110 250 L 145 250 C 155 250 162 258 170 270 Z'
  },
  {
    id: 'monza',
    number: '02',
    name: 'Autodromo Nazionale Monza',
    trackName: 'Tempio della Velocità',
    city: 'Monza',
    country: 'Italia',
    flag: '🇮🇹',
    tag: 'El Templo de la Velocidad',
    accentColor: '#00D2BE',
    length: '5.793 km',
    turns: 11,
    drsZones: 2,
    topSpeed: '358 km/h',
    lapRecord: '1:21.046',
    recordHolder: 'R. Barrichello (2004)',
    firstGrandPrix: '1950',
    curvasIconicas: [
      { name: 'Prima Variante (T1-T2)', desc: 'De 350 km/h a 70 km/h en 100 metros', x: 390, y: 265 },
      { name: 'Curva Grande (Biassono)', desc: 'Curvón a fondo de máxima fuerza G', x: 460, y: 200 },
      { name: 'Variante della Roggia', desc: 'Chicana técnica tras la recta del bosque', x: 290, y: 125 },
      { name: 'Curvas de Lesmo 1 & 2', desc: 'Precisión absoluta entre los árboles', x: 200, y: 25 },
      { name: 'Variante Ascari', desc: 'Complejo de chicanas a más de 230 km/h', x: 150, y: 140 },
      { name: 'Curva Parabolica (Alboreto)', desc: 'Entrada legendaria a la recta de meta', x: 40, y: 220 }
    ],
    svgPath: 'M 110 265 L 390 265 C 430 265 460 245 460 200 C 460 150 425 125 370 125 L 290 125 C 265 125 250 115 250 95 L 250 65 C 250 40 230 25 200 25 C 170 25 150 45 150 75 L 150 140 C 150 160 140 175 120 175 L 80 175 C 55 175 40 195 40 220 C 40 250 65 265 110 265 Z'
  },
  {
    id: 'silverstone',
    number: '03',
    name: 'Circuito de Silverstone',
    trackName: 'The Home of British Motor Racing',
    city: 'Northamptonshire',
    country: 'Reino Unido',
    flag: '🇬🇧',
    tag: 'La Cuna de la Fórmula 1',
    accentColor: '#FF8000',
    length: '5.891 km',
    turns: 18,
    drsZones: 2,
    topSpeed: '335 km/h',
    lapRecord: '1:27.097',
    recordHolder: 'M. Verstappen (2020)',
    firstGrandPrix: '1950 (1º en la historia)',
    curvasIconicas: [
      { name: 'Hamilton Straight & Abbey', desc: 'Curva 1 ciega a fondo en 7ª marcha', x: 295, y: 265 },
      { name: 'Copse Corner', desc: 'Giro mítico a derechas a casi 290 km/h', x: 415, y: 130 },
      { name: 'Maggotts-Becketts-Chapel', desc: 'La secuencia de enlazadas más famosa del mundo', x: 405, y: 30 },
      { name: 'Hangar Straight', desc: 'Recta de máxima velocidad hacia Stowe', x: 225, y: 80 },
      { name: 'Stowe & Club Corner', desc: 'Frenada fuerte y llegada triunfal a meta', x: 75, y: 175 }
    ],
    svgPath: 'M 205 265 L 295 265 C 325 265 350 245 355 215 L 365 170 C 370 145 390 130 415 130 C 445 130 465 110 465 80 C 465 50 440 30 405 30 L 295 30 C 265 30 240 50 225 80 L 185 140 C 170 165 150 175 125 175 L 75 175 C 50 175 35 195 40 220 C 45 245 70 265 100 265 L 145 265 C 165 265 180 250 190 235 L 195 235 C 200 250 202 265 205 265 Z'
  }
];

export function CircuitShowcase({ selectedIndex = 0, onSelectIndex }) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = onSelectIndex ? selectedIndex : internalIndex;
  const setIndex = onSelectIndex || setInternalIndex;
  const circuit = legendaryCircuits[currentIndex] || legendaryCircuits[0];
  const [activeTurn, setActiveTurn] = useState(null);

  return (
    <div className="circuit-showcase-container" style={{ '--circuit-accent': circuit.accentColor }}>
      {/* Circuit Selector Header */}
      <div className="circuit-nav-header">
        <div className="circuit-top-banner">
          <div className="circuit-badge-inline">
            <span className="circuit-live-indicator" />
            <span className="circuit-badge-text">🏁 TOP 3 CIRCUITOS</span>
          </div>
          <span className="circuit-tag-badge">{circuit.tag}</span>
        </div>

        <div className="circuit-tabs" role="tablist" aria-label="Seleccionar circuito legendario">
          {legendaryCircuits.map((item, index) => {
            const isSelected = currentIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`circuit-tab-pill ${isSelected ? 'is-active' : ''}`}
                style={{ '--tab-glow': item.accentColor }}
                onClick={() => setIndex(index)}
              >
                <span className="circuit-flag">{item.flag}</span>
                <span className="circuit-num-badge">0{index + 1}</span>
                <span className="circuit-short-name">{item.name.replace('Circuito de ', '').replace('Autodromo Nazionale ', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Interactive Circuit Stage with Motion */}
      <div className="circuit-track-stage">
        <div className="circuit-ambient-glow" />
        <div className="circuit-grid-pattern" aria-hidden="true" />

        <AnimatePresence mode="wait">
          <motion.div
            key={circuit.id}
            className="circuit-svg-wrapper"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              viewBox="0 0 500 300"
              className="circuit-svg-map"
              preserveAspectRatio="xMidYMid meet"
              aria-label={`Mapa del ${circuit.name}`}
            >
              <defs>
                <filter id={`circuit-glow-${circuit.id}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id={`track-gradient-${circuit.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor={circuit.accentColor} stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Asphalt Road Bed */}
              <path
                d={circuit.svgPath}
                className="circuit-road-bed"
              />

              {/* Track Kerb Edge Line */}
              <path
                d={circuit.svgPath}
                className="circuit-racing-line"
                style={{ stroke: circuit.accentColor, filter: `url(#circuit-glow-${circuit.id})` }}
              />

              {/* High-Tech Animated Racing Photon / Lap Car */}
              <circle r="5" fill="#ffffff" filter={`url(#circuit-glow-${circuit.id})`}>
                <animateMotion dur="4.2s" repeatCount="indefinite" path={circuit.svgPath} />
              </circle>
              <circle r="11" fill={circuit.accentColor} opacity="0.5" filter={`url(#circuit-glow-${circuit.id})`}>
                <animateMotion dur="4.2s" repeatCount="indefinite" path={circuit.svgPath} />
              </circle>

              {/* Start / Finish Line Marker */}
              <line x1="240" y1="250" x2="240" y2="285" stroke="#ffffff" strokeWidth="3" strokeDasharray="3 2" />

              {/* Iconic Turns Hotspots */}
              {circuit.curvasIconicas.map((turn, tIdx) => (
                <g
                  key={tIdx}
                  className="circuit-turn-node"
                  transform={`translate(${turn.x}, ${turn.y})`}
                  onMouseEnter={() => setActiveTurn(turn)}
                  onMouseLeave={() => setActiveTurn(null)}
                >
                  <circle r="12" fill="transparent" style={{ cursor: 'pointer' }} />
                  <circle r="4.5" fill="#ffffff" stroke={circuit.accentColor} strokeWidth="2" />
                  <circle r="8" fill="none" stroke={circuit.accentColor} strokeWidth="1" opacity="0.6">
                    <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Active Turn Floating HUD Tooltip */}
            <div className={`circuit-turn-tooltip ${activeTurn ? 'is-visible' : ''}`}>
              <strong>{activeTurn?.name || 'Pasa el ratón por los puntos'}</strong>
              <span>{activeTurn?.desc || 'Puntos clave del trazado'}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="circuit-scanline" />
      </div>

      {/* Circuit Information Bottom Bar */}
      <div className="circuit-info-bar">
        <div className="circuit-identity">
          <span className="circuit-name-title">{circuit.name}</span>
          <span className="circuit-meta-subtitle">{circuit.city}, {circuit.country} · GP desde {circuit.firstGrandPrix}</span>
        </div>
        <span className="circuit-turns-badge">{circuit.turns} CURVAS · {circuit.drsZones} DRS</span>
      </div>

      {/* Circuit Telemetry Grid */}
      <Grid container spacing={1.25} className="circuit-telemetry-grid">
        <Grid item xs={6} sm={3}>
          <div className="telemetry-cell">
            <div className="telemetry-value">{circuit.length}</div>
            <div className="telemetry-label">LONGITUD</div>
            <div className="telemetry-detail">Trazado oficial</div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="telemetry-cell">
            <div className="telemetry-value">{circuit.topSpeed}</div>
            <div className="telemetry-label">VEL. PUNTA</div>
            <div className="telemetry-detail">Trampa de velocidad</div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="telemetry-cell">
            <div className="telemetry-value">{circuit.lapRecord}</div>
            <div className="telemetry-label">RÉCORD DE VUELTA</div>
            <div className="telemetry-detail">{circuit.recordHolder}</div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="telemetry-cell">
            <div className="telemetry-value">{circuit.turns}</div>
            <div className="telemetry-label">CURVAS TOTALES</div>
            <div className="telemetry-detail">Grado 1 FIA</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
