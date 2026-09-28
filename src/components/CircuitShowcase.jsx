import { Box, Grid } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const legendaryCircuits = [
  {
    id: 'monaco',
    number: '01',
    name: 'Circuito de Mónaco',
    shortName: 'Mónaco',
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
    weather: 'Soleado · 25°C',
    trackTemp: '38°C Asfalto',
    elevation: '42m Desnivel',
    maxG: '5.0G Fuerza Lateral',
    sectors: [
      { name: 'S1', time: '19.8s', speed: '275 km/h' },
      { name: 'S2', time: '34.2s', speed: '210 km/h' },
      { name: 'S3', time: '18.9s', speed: '290 km/h' }
    ],
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
    shortName: 'Monza',
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
    weather: 'Despejado · 28°C',
    trackTemp: '42°C Asfalto',
    elevation: '12m Desnivel',
    maxG: '5.4G Fuerza Lateral',
    sectors: [
      { name: 'S1', time: '26.4s', speed: '348 km/h' },
      { name: 'S2', time: '27.1s', speed: '335 km/h' },
      { name: 'S3', time: '27.5s', speed: '358 km/h' }
    ],
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
    shortName: 'Silverstone',
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
    firstGrandPrix: '1950 (1º GP F1)',
    weather: 'Nublado · 21°C',
    trackTemp: '29°C Asfalto',
    elevation: '11m Desnivel',
    maxG: '5.6G Maggotts/Becketts',
    sectors: [
      { name: 'S1', time: '28.1s', speed: '315 km/h' },
      { name: 'S2', time: '35.4s', speed: '335 km/h' },
      { name: 'S3', time: '23.5s', speed: '298 km/h' }
    ],
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
      {/* Top Header Banner with Live Badge and Circuit Tag */}
      <div className="circuit-nav-header">
        <div className="circuit-top-banner">
          <div className="circuit-badge-inline">
            <span className="circuit-live-indicator" />
            <span className="circuit-badge-text">🏁 TOP 3 CIRCUITOS ICÓNICOS</span>
          </div>
          <span className="circuit-tag-badge">{circuit.tag}</span>
        </div>

        {/* Full-width Balanced 3-Column Tabs spanning horizontally */}
        <div className="circuit-tabs-grid" role="tablist" aria-label="Seleccionar circuito legendario">
          {legendaryCircuits.map((item, index) => {
            const isSelected = currentIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`circuit-tab-card ${isSelected ? 'is-active' : ''}`}
                style={{ '--tab-accent': item.accentColor }}
                onClick={() => setIndex(index)}
              >
                <div className="circuit-tab-header">
                  <span className="circuit-flag">{item.flag}</span>
                  <span className="circuit-num-badge">P0{index + 1}</span>
                </div>
                <div className="circuit-tab-title">{item.shortName}</div>
                <div className="circuit-tab-sub">{item.length} · {item.turns}T</div>
                {isSelected && <motion.div layoutId="circuitActiveGlow" className="circuit-tab-active-bar" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Interactive Circuit Stage with Motion & Wide Telemetry HUD */}
      <div className="circuit-track-stage">
        <div className="circuit-ambient-glow" />
        <div className="circuit-grid-pattern" aria-hidden="true" />

        {/* Live Weather / Conditions HUD on Top Left */}
        <div className="circuit-weather-hud">
          <span className="weather-tag">⛅ {circuit.weather}</span>
          <span className="weather-temp">🔥 {circuit.trackTemp}</span>
        </div>

        {/* Live Sectors Breakdown on Top Right */}
        <div className="circuit-sectors-hud">
          {circuit.sectors.map((sec) => (
            <div key={sec.name} className="sector-pill">
              <span className="sector-name">{sec.name}</span>
              <span className="sector-time">{sec.time}</span>
            </div>
          ))}
        </div>

        {/* Extra Live G-Force & Aero Badge on Bottom Left of Stage */}
        <div className="circuit-extra-hud-bottom">
          <span className="extra-hud-pill">🏎️ {circuit.maxG}</span>
          <span className="extra-hud-pill">📐 {circuit.elevation}</span>
        </div>

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
              viewBox="0 0 500 290"
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
              <circle r="5.5" fill="#ffffff" filter={`url(#circuit-glow-${circuit.id})`}>
                <animateMotion dur="4.2s" repeatCount="indefinite" path={circuit.svgPath} />
              </circle>
              <circle r="12" fill={circuit.accentColor} opacity="0.45" filter={`url(#circuit-glow-${circuit.id})`}>
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
                  <circle r="14" fill="transparent" style={{ cursor: 'pointer' }} />
                  <circle r="5" fill="#ffffff" stroke={circuit.accentColor} strokeWidth="2.5" />
                  <circle r="9" fill="none" stroke={circuit.accentColor} strokeWidth="1.5" opacity="0.7">
                    <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
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

      {/* Circuit Telemetry Grid - Wide 4 Column Grid */}
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
