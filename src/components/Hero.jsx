import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { sourceLinks } from '../data/f1Data.js';
import { useChampionship } from '../hooks/useChampionship.js';
import { getTeamVisual } from '../data/visualMetadata.js';
import { CountUp, RacingGrid, ShinyText, SpotlightCard, GlassTitleCard, AeroSpeedStreaks, F1RevLights, TitaniumSparks } from './ReactBits.jsx';
import { CircuitShowcase } from './CircuitShowcase.jsx';

const MotionBox = motion.create ? motion.create(Box) : motion(Box);
const formatRaceDate = (date) => date ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`)) : '—';

function Hero() {
  const { data, loading } = useChampionship();
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width:899px)');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [boostActive, setBoostActive] = useState(false);
  const leader = data?.drivers[0];

  const defaultTop3 = useMemo(() => [
    { slug: 'mercedes', name: 'Mercedes-AMG F1', position: 1, points: 538, leaderName: 'K. Antonelli', leaderPts: 302 },
    { slug: 'ferrari', name: 'Scuderia Ferrari', position: 2, points: 492, leaderName: 'C. Leclerc', leaderPts: 265 },
    { slug: 'mclaren', name: 'McLaren F1 Team', position: 3, points: 468, leaderName: 'L. Norris', leaderPts: 248 }
  ], []);

  const topTeams = useMemo(() => {
    if (!data?.teams || data.teams.length === 0) return defaultTop3;
    return data.teams.slice(0, 3).map((team, idx) => {
      const teamDriver = data.drivers?.find((d) => d.teamSlug === team.slug || d.team?.toLowerCase().includes(team.name.toLowerCase()));
      return {
        slug: team.slug,
        name: team.name,
        position: idx + 1,
        points: team.points,
        leaderName: teamDriver ? teamDriver.short : (idx === 0 && leader ? leader.short : 'DRV'),
        leaderPts: teamDriver ? teamDriver.points : (idx === 0 && leader ? leader.points : 0)
      };
    });
  }, [data?.teams, data?.drivers, leader, defaultTop3]);

  const [selectedPodium, setSelectedPodium] = useState(0);
  const currentTeam = topTeams[selectedPodium] || topTeams[0];
  const currentVisual = getTeamVisual(currentTeam.slug);

  const nextRace = useMemo(() => data?.races.find((race) => new Date(`${race.date}T23:59:59`) >= new Date()) || null, [data?.races]);
  
  const telemetry = currentTeam ? [
    { label: 'CARRERAS', value: data?.races?.length || 24, detail: 'Calendario 2026', numeric: true },
    { label: `LÍDER P${currentTeam.position}`, value: currentTeam.leaderPts, suffix: ' PTS', detail: currentTeam.leaderName, numeric: true },
    { label: `EQUIPO P${currentTeam.position}`, value: currentTeam.name, detail: `${currentTeam.points} puntos`, numeric: false },
    { label: 'PRÓXIMA', value: nextRace?.round || '—', prefix: 'R', detail: nextRace ? formatRaceDate(nextRace.date) : 'Calendario finalizado', numeric: true }
  ] : [];

  const [carOffset, setCarOffset] = useState({ x: 0, y: 0 });
  const [activeAeroMode, setActiveAeroMode] = useState(false);

  const handlePointerMove = (event) => {
    if (isMobile || reducedMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - box.top) / box.height - 0.5) * -7,
      y: ((event.clientX - box.left) / box.width - 0.5) * 9
    });
  };

  const handleCarPointerMove = (e) => {
    if (isMobile || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setCarOffset({
      x: px * 12,
      y: py * 5
    });
  };

  const handleCarPointerLeave = () => {
    setCarOffset({ x: 0, y: 0 });
  };

  return <Box id="inicio" component="section" className="premium-hero" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
    <RacingGrid /><Box className="hero-orbit hero-orbit-one" aria-hidden="true" /><Box className="hero-orbit hero-orbit-two" aria-hidden="true" />
    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={{ xs: 4, md: 5, lg: 6 }} sx={{ alignItems: 'stretch' }}>
        <Grid xs={12} md={6} className="hero-glass-col">
          <MotionBox className="hero-card-motion" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .7, delay: reducedMotion ? 0 : .08 }}>
            <GlassTitleCard className={`hero-title-glass-box ${boostActive ? 'hero-boost-active' : ''}`} isBoosted={boostActive}>
              <AeroSpeedStreaks boosted={boostActive} />
              <TitaniumSparks active={!reducedMotion} />
              
              <div className="hero-glass-hud-top">
                <span className="hud-live-pill"><span className="hud-pulse-dot" /> FIA OFFICIAL 2026</span>
                <F1RevLights boosted={boostActive} />
                <span className="hud-spec-tag">ACTIVE AERO // GEN-3</span>
              </div>

              <Typography variant="overline" className="hero-kicker">FIA FORMULA ONE WORLD CHAMPIONSHIP</Typography>
              
              <div className="hero-title-wrapper">
                <Typography variant="h1" className="hero-title">
                  <span className="f1-glass-text">F1</span>
                  <ShinyText className="hero-title-accent">2026</ShinyText>
                </Typography>
                <div className={`hero-neon-aura ${boostActive ? 'aura-boosted' : ''}`} aria-hidden="true" />
                <div className="hero-laser-speedlines" aria-hidden="true" />
              </div>

              <div className="hero-glass-bottom-bar">
                <div className="hero-glass-tech-specs">
                  <span className="tech-spec-pill">100% SUSTAINABLE FUEL</span>
                  <span className="tech-spec-pill">350 KW MGU-K HYBRID</span>
                </div>

                <button
                  type="button"
                  className={`f1-interactive-boost-btn ${boostActive ? 'is-active' : ''}`}
                  onClick={() => setBoostActive(!boostActive)}
                  title="Haz clic para activar/desactivar la sobrealimentación eléctrica 2026"
                >
                  <span className="boost-btn-pulse" />
                  <span className="boost-btn-icon">⚡</span>
                  <span className="boost-btn-text">{boostActive ? 'BOOST ACTIVADO' : 'PUSH TO PASS 350kW'}</span>
                </button>
              </div>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="hero-actions">
                <Button href="#pilotos" size="large" variant="contained" endIcon={<ArrowForwardIcon />}>Explorar pilotos</Button>
                <Button href={sourceLinks.results} target="_blank" rel="noreferrer" size="large" variant="outlined">Fuente oficial F1</Button>
              </Stack>
            </GlassTitleCard>
          </MotionBox>
        </Grid>
        <Grid xs={12} md={6} className="hero-circuit-col">
          <MotionBox className="hero-card-motion" initial={{ opacity: 0, scale: .96, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : .82, delay: reducedMotion ? 0 : .18 }}>
            <SpotlightCard className="hero-machine-card circuit-card-spotlight" showBrackets={true} style={{ '--current-team-color': '#E8002D' }}>
              <CircuitShowcase />
              <div className="next-race-bar">
                <span className="next-race-pill"><span className="hud-pulse-dot" /> PRÓXIMA CARRERA</span>
                <strong>{nextRace?.raceName || (loading ? 'Cargando calendario…' : 'No hay citas pendientes')}</strong>
                <b>{nextRace ? formatRaceDate(nextRace.date) : '—'}</b>
              </div>
            </SpotlightCard>
          </MotionBox>
        </Grid>
      </Grid>

      {/* ── SECTION DIVIDER ── */}
      <div className="hero-section-divider" aria-hidden="true">
        <span className="hero-section-divider-label">🏎️ &nbsp; PARRILLA DE HONOR · CONSTRUCTORES 2026 &nbsp; 🏆</span>
      </div>

      {/* SECCIÓN ABAJO: EQUIPOS TOP 3 / PARRILLA DE HONOR 2026 */}
      <Box id="top-equipos">
        <MotionBox initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .7, delay: .25 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mb: 2.5, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <span className="section-dot-pulse" style={{ background: currentVisual?.color || '#00D2BE', boxShadow: `0 0 12px ${currentVisual?.color || '#00D2BE'}` }} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2.1rem' }, fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '0.06em', lineHeight: 1 }}>
                EQUIPOS TOP 3
                <Box component="span" sx={{ color: 'var(--color-gold)', ml: 1.5, fontSize: { xs: '1.1rem', md: '1.4rem' } }}>
                  MONOPLAZAS 2026
                </Box>
              </Typography>
            </Stack>

            <div className="podium-switcher" role="tablist" aria-label="Seleccionar monoplaza P1, P2 o P3">
              {topTeams.map((team, index) => {
                const visual = getTeamVisual(team.slug);
                const isSelected = selectedPodium === index;
                const labels = ['P1', 'P2', 'P3'];
                const medals = ['🥇', '🥈', '🥉'];
                return (
                  <button
                    key={team.slug}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`podium-tab-btn ${isSelected ? 'is-active' : ''}`}
                    style={{ '--tab-color': visual?.color || '#00D2BE' }}
                    onClick={() => setSelectedPodium(index)}
                  >
                    <span className="podium-pos-badge">{labels[index]}</span>
                    <span className="podium-team-label">{medals[index]} {team.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </Stack>

          <SpotlightCard className="hero-machine-card hero-podium-full-card" style={{ '--current-team-color': currentVisual?.color || '#00D2BE' }}>
            <div className="machine-hud hud-top">
              <div className="hud-team-spec">
                <span className="team-color-dot" style={{ backgroundColor: currentVisual?.color || '#00D2BE' }} />
                <span className="team-chassis-label">CHASIS GEN-3 · HÍBRIDO 100% SOSTENIBLE</span>
              </div>

              <button
                type="button"
                className={`car-aero-mode-btn ${activeAeroMode ? 'is-active' : ''}`}
                onClick={() => setActiveAeroMode(!activeAeroMode)}
                title="Alternar vista de telemetría aerodinámica"
              >
                <span className="aero-pulse-dot" />
                {activeAeroMode ? 'AERO ACTIVO' : 'MODO AERO'}
              </button>
            </div>

            <div
              className={`hero-car-stage hero-car-stage-wide ${activeAeroMode ? 'aero-mode-active' : ''}`}
              onPointerMove={handleCarPointerMove}
              onPointerLeave={handleCarPointerLeave}
            >
              <div className="car-ground-glow" style={{ '--glow-color': currentVisual?.color || '#00D2BE' }} />
              <div className="car-shadow" />
              
              {/* Aerodynamic Wind Tunnel Streamlines */}
              <div className="car-3d-streamlines" aria-hidden="true">
                <span className="aero-flow flow-1" style={{ '--flow-color': currentVisual?.color || '#00f0ff' }} />
                <span className="aero-flow flow-2" style={{ '--flow-color': currentVisual?.color || '#00f0ff' }} />
                <span className="aero-flow flow-3" style={{ '--flow-color': currentVisual?.color || '#00f0ff' }} />
              </div>

              {/* Smooth Car Stage with Drive-In AnimatePresence transition */}
              <div
                className="hero-car-smooth-wrapper"
                style={{
                  transform: isMobile || reducedMotion
                    ? undefined
                    : `translate3d(${carOffset.x}px, ${carOffset.y}px, 0)`
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTeam.slug}
                    className="hero-car-motion-container"
                    initial={{ opacity: 0, x: 55, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -55, filter: 'blur(3px)' }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Box
                      component="img"
                      src={currentVisual?.car}
                      alt={`Monoplaza de ${currentTeam.name}`}
                      className="hero-car"
                      referrerPolicy="no-referrer"
                    />

                    {/* Interactive Aerodynamic Hotspots */}
                    <div className="car-3d-hotspot spot-front-wing" title="Alerón delantero activo con DRS flap">
                      <span className="spot-core" />
                      <span className="spot-label">ACTIVE WING</span>
                    </div>
                    <div className="car-3d-hotspot spot-cockpit" title="Halo de titanio grado aeroespacial">
                      <span className="spot-core" />
                      <span className="spot-label">HALO GEN-2</span>
                    </div>
                    <div className="car-3d-hotspot spot-sidepod" title="Unidad de potencia híbrida 350kW">
                      <span className="spot-core" />
                      <span className="spot-label">350kW MGU-K</span>
                    </div>
                    <div className="car-3d-hotspot spot-rear-wing" title="Alerón trasero aerodinámica activa">
                      <span className="spot-core" />
                      <span className="spot-label">ACTIVE DRS</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="car-scanline" />
            </div>

            <div className="machine-hud hud-bottom">
              <div className="hud-bottom-team">
                <span className="team-color-dot" style={{ backgroundColor: currentVisual?.color || '#00D2BE' }} />
                <span className="team-name-strong">{currentTeam?.name}</span>
              </div>
              <span className="hud-pos-rank">POS 0{currentTeam.position} · {currentTeam.points} PTS</span>
            </div>

            <Grid container spacing={1.5} className="hero-telemetry">
              {(loading ? Array.from({ length: 4 }, (_, index) => ({ label: `CARGANDO ${index + 1}`, value: '…', detail: 'Datos en directo' })) : telemetry).map((metric) => (
                <Grid xs={6} sm={3} key={metric.label}>
                  <div className="telemetry-cell">
                    <div className="telemetry-value">{metric.prefix}{metric.numeric && typeof metric.value === 'number' ? <CountUp value={metric.value} /> : metric.value}{metric.suffix}</div>
                    <div className="telemetry-label">{metric.label}</div>
                    <div className="telemetry-detail">{metric.detail}</div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </SpotlightCard>
        </MotionBox>
      </Box>
    </Container>
  </Box>;
}
export default Hero;
