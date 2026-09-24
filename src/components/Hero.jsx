import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import { Box, Button, Chip, Container, Grid, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { sourceLinks } from '../data/f1Data.js';
import { useChampionship } from '../hooks/useChampionship.js';
import { getTeamVisual } from '../data/visualMetadata.js';
import { CountUp, RacingGrid, ShinyText, SpotlightCard } from './ReactBits.jsx';

const MotionBox = motion(Box);
const formatRaceDate = (date) => date ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`)) : '—';

function Hero() {
  const { data, loading } = useChampionship();
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width:899px)');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const leader = data?.drivers[0];
  const leadingTeam = data?.teams[0];
  const leadingVisual = leadingTeam && getTeamVisual(leadingTeam.slug);
  const nextRace = useMemo(() => data?.races.find((race) => new Date(`${race.date}T23:59:59`) >= new Date()) || null, [data?.races]);
  const telemetry = leader && leadingTeam ? [
    { label: 'CARRERAS', value: data.races.length, detail: 'Calendario Jolpica', numeric: true },
    { label: 'LÍDER', value: leader.points, suffix: ' PTS', detail: leader.short, numeric: true },
    { label: 'EQUIPO P1', value: leadingTeam.name, detail: `${leadingTeam.points} puntos`, numeric: false },
    { label: 'PRÓXIMA', value: nextRace?.round || '—', prefix: 'R', detail: nextRace ? formatRaceDate(nextRace.date) : 'Calendario finalizado', numeric: true }
  ] : [];
  const handlePointerMove = (event) => {
    if (isMobile || reducedMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - box.top) / box.height - 0.5) * -7, y: ((event.clientX - box.left) / box.width - 0.5) * 9 });
  };

  return <Box id="inicio" component="section" className="premium-hero" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
    <RacingGrid /><Box className="hero-orbit hero-orbit-one" aria-hidden="true" /><Box className="hero-orbit hero-orbit-two" aria-hidden="true" />
    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={{ xs: 4, md: 3 }} alignItems="center">
        <Grid item xs={12} md={6.15}>
          <MotionBox initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .7, delay: reducedMotion ? 0 : .08 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap className="hero-chips"><Chip icon={<SpeedIcon />} color="primary" label="TEMPORADA 2026" />{leader ? <Chip icon={<EmojiEventsIcon />} label={`${leader.name} · ${leader.points} PTS`} variant="outlined" /> : <Skeleton width={210} />}</Stack>
            <Typography variant="overline" className="hero-kicker">FIA FORMULA ONE WORLD CHAMPIONSHIP</Typography>
            <Typography variant="h1" className="hero-title">F1 <ShinyText className="hero-title-accent">GARAGE</ShinyText></Typography>
            <Typography className="hero-copy">Datos oficiales, clasificaciones y calendario 2026. Una lectura clara de la parrilla, con la pista siempre en primer plano.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="hero-actions"><Button href="#pilotos" size="large" variant="contained" endIcon={<ArrowForwardIcon />}>Explorar pilotos</Button><Button href={sourceLinks.results} target="_blank" rel="noreferrer" size="large" variant="outlined">Fuente oficial F1</Button></Stack>
          </MotionBox>
        </Grid>
        <Grid item xs={12} md={5.85}>
          <MotionBox initial={{ opacity: 0, scale: .96, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : .82, delay: reducedMotion ? 0 : .18 }} style={{ transform: isMobile || reducedMotion ? undefined : `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
            <SpotlightCard className="hero-machine-card">
              <div className="machine-hud hud-top"><span>LIVE / 2026</span><span>DATA GARAGE</span></div>
              <div className="hero-car-stage"><div className="car-shadow" /><Box component="img" src={leadingVisual?.car} alt={leadingTeam ? `Monoplaza de ${leadingTeam.name}` : 'Coche de Fórmula 1'} className="hero-car" /><div className="car-scanline" /></div>
              <div className="machine-hud hud-bottom"><span>{leadingTeam?.name || 'Cargando equipo'}</span><span>POS 01</span></div>
              <Grid container spacing={1.25} className="hero-telemetry">{(loading ? Array.from({ length: 4 }, (_, index) => ({ label: `CARGANDO ${index + 1}`, value: '…', detail: 'Datos en directo' })) : telemetry).map((metric) => <Grid item xs={6} key={metric.label}><div className="telemetry-cell"><div className="telemetry-value">{metric.prefix}{metric.numeric && typeof metric.value === 'number' ? <CountUp value={metric.value} /> : metric.value}{metric.suffix}</div><div className="telemetry-label">{metric.label}</div><div className="telemetry-detail">{metric.detail}</div></div></Grid>)}</Grid>
              <div className="next-race-bar"><span>PRÓXIMA CARRERA</span><strong>{nextRace?.raceName || (loading ? 'Cargando calendario…' : 'No hay citas pendientes')}</strong><b>{nextRace ? formatRaceDate(nextRace.date) : '—'}</b></div>
            </SpotlightCard>
          </MotionBox>
        </Grid>
      </Grid>
    </Container>
  </Box>;
}
export default Hero;
