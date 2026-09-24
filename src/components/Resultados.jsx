import { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, Card, CardActionArea, Chip, Container, IconButton, Paper, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { sourceLinks } from '../data/f1Data.js';
import { useChampionship } from '../hooks/useChampionship.js';
import { useSeason } from '../hooks/useSeason.js';
import { getDriverPortrait, getTeamVisual } from '../data/visualMetadata.js';
import { ErrorState, LoadingState } from './ApiStatus.jsx';

const MotionBox = motion(Box);
const initials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2);

function Resultados() {
  const championship = useChampionship();
  const season = useSeason();
  const reducedMotion = useReducedMotion();
  const [showAllRaces, setShowAllRaces] = useState(false);
  const [selectedRace, setSelectedRace] = useState(null);
  const races = season.data || [];
  const drivers = championship.data?.drivers || [];
  const teams = championship.data?.teams || [];
  const visibleRaces = showAllRaces ? races : races.slice(0, 10);
  const isLoading = championship.loading || season.loading;
  const error = championship.error || season.error;
  const teamFor = (race) => teams.find((team) => team.name === race.team);
  const colorFor = (race) => {
    const team = teamFor(race);
    return team ? getTeamVisual(team.slug).color : '#5E6570';
  };
  const driverFor = (race) => drivers.find((driver) => driver.name === race.winner);
  const portraitFor = (race) => {
    const driver = driverFor(race);
    return driver && getDriverPortrait(driver.number, driver.teamSlug, driver.id);
  };

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && setSelectedRace(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <Box component="section" id="resultados" sx={{ py: { xs: 8, md: 12 } }}>
    <Container maxWidth="xl">
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>Resultados oficiales</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>Resultados 2026</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Calendario y resultados de la temporada.</Typography>
      </Stack>

      {isLoading && <LoadingState label="Cargando resultados y clasificación..." cards={4} />}
      {error && !championship.data && <ErrorState error={error} onRetry={() => { championship.refresh(); season.refresh(); }} />}
      {!isLoading && championship.data && <>
        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' } }}>
          {visibleRaces.map((race, index) => {
            const hasWinner = race.winner !== '—';
            const color = colorFor(race);
            return <Card component={motion.article} key={race.round} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: reducedMotion ? 0 : .34, delay: reducedMotion ? 0 : Math.min(index * .03, .22) }} sx={{ background: `linear-gradient(145deg, ${hasWinner ? `${color}42` : 'rgba(94,101,112,.28)'}, rgba(7,7,9,.92) 68%)`, border: `1px solid ${hasWinner ? `${color}88` : 'rgba(255,255,255,.14)'}`, boxShadow: `inset 0 1px rgba(255,255,255,.18), 0 18px 44px ${hasWinner ? `${color}22` : 'rgba(0,0,0,.22)'}`, overflow: 'hidden' }}>
              <CardActionArea onClick={() => setSelectedRace(race)} sx={{ height: '100%', p: 2.2, textAlign: 'left' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}><Chip label={`R${race.round}`} size="small" sx={{ bgcolor: hasWinner ? color : 'rgba(255,255,255,.14)', color: 'common.white', fontWeight: 1000 }} /><Typography sx={{ color: 'rgba(255,255,255,.72)', fontSize: '.76rem', fontWeight: 800 }}>{race.date}</Typography></Stack>
                <Typography variant="h4" sx={{ fontSize: '2rem', lineHeight: .9, mt: 2, textTransform: 'uppercase' }}>{race.grandPrix}</Typography>
                {hasWinner ? <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mt: 2.25 }}><Avatar src={portraitFor(race)} alt={race.winner} sx={{ bgcolor: color, height: 48, width: 48, '& img': { objectFit: 'cover', objectPosition: '50% 12%' } }}>{initials(race.winner)}</Avatar><Box sx={{ minWidth: 0 }}><Typography sx={{ color: 'rgba(255,255,255,.65)', fontSize: '.7rem', fontWeight: 900, letterSpacing: '.08em' }}>GANADOR</Typography><Typography sx={{ fontWeight: 900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{race.winner}</Typography><Typography sx={{ color, fontSize: '.8rem', fontWeight: 900 }}>{race.team}</Typography></Box></Stack> : <Stack direction="row" alignItems="center" spacing={1.1} sx={{ color: 'rgba(255,255,255,.68)', mt: 2.25 }}><CalendarMonthIcon /><Typography sx={{ fontWeight: 900 }}>Próximamente</Typography></Stack>}
              </CardActionArea>
            </Card>;
          })}
        </Box>
        {races.length > 10 && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><Button onClick={() => setShowAllRaces((value) => !value)} variant="outlined">{showAllRaces ? 'Ver menos' : 'Ver más'}</Button></Box>}
      </>}
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>Fuente: <Box component="a" href={sourceLinks.results} target="_blank" rel="noreferrer" sx={{ color: 'primary.main' }}>formula1.com/en/results/2026/races</Box></Typography>
    </Container>

    <AnimatePresence>{selectedRace && <MotionBox aria-modal="true" onClick={() => setSelectedRace(null)} role="dialog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2 }} sx={{ alignItems: 'center', backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,.68)', display: 'flex', inset: 0, justifyContent: 'center', p: 2, position: 'fixed', zIndex: 1400 }}>
      <MotionBox onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: reducedMotion ? 0 : .3, ease: 'easeOut' }} sx={{ background: `linear-gradient(145deg, ${selectedRace.winner !== '—' ? `${colorFor(selectedRace)}4f` : 'rgba(74,79,88,.48)'}, #0a0a0d 72%)`, border: `1px solid ${selectedRace.winner !== '—' ? `${colorFor(selectedRace)}99` : 'rgba(255,255,255,.18)'}`, boxShadow: '0 32px 100px rgba(0,0,0,.62)', maxWidth: 580, p: { xs: 2.5, sm: 3.5 }, position: 'relative', width: '100%' }}>
        <IconButton aria-label="Cerrar resultados" onClick={() => setSelectedRace(null)} sx={{ color: 'common.white', position: 'absolute', right: 12, top: 12 }}><CloseIcon /></IconButton>
        <Chip label={`RONDA ${selectedRace.round}`} sx={{ bgcolor: selectedRace.winner !== '—' ? colorFor(selectedRace) : 'rgba(255,255,255,.16)', color: 'common.white', fontWeight: 1000 }} />
        <Typography variant="h3" sx={{ fontSize: 'clamp(2.5rem, 9vw, 4.4rem)', lineHeight: .82, mt: 2 }}>{selectedRace.grandPrix}</Typography><Typography sx={{ color: 'rgba(255,255,255,.72)', fontWeight: 800, mt: 1 }}>{selectedRace.date}</Typography>
        {selectedRace.winner !== '—' ? <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mt: 3 }}><Avatar src={portraitFor(selectedRace)} sx={{ bgcolor: colorFor(selectedRace), height: 64, width: 64, '& img': { objectFit: 'cover', objectPosition: '50% 12%' } }}>{initials(selectedRace.winner)}</Avatar><Box><Typography sx={{ color: 'rgba(255,255,255,.65)', fontSize: '.72rem', fontWeight: 900, letterSpacing: '.1em' }}>GANADOR</Typography><Typography variant="h5">{selectedRace.winner}</Typography><Typography sx={{ color: colorFor(selectedRace), fontWeight: 900 }}>{selectedRace.team}</Typography></Box></Stack> : <Stack direction="row" alignItems="center" spacing={1.1} sx={{ color: 'rgba(255,255,255,.72)', mt: 3 }}><CalendarMonthIcon /><Typography sx={{ fontWeight: 900 }}>Carrera futura</Typography></Stack>}
        <Box sx={{ display: 'grid', gap: 1.2, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', mt: 3 }}><Paper sx={{ bgcolor: 'rgba(0,0,0,.28)', p: 1.4 }}><Typography variant="caption">VUELTAS</Typography><Typography variant="h5">{selectedRace.laps}</Typography></Paper><Paper sx={{ bgcolor: 'rgba(0,0,0,.28)', p: 1.4 }}><Typography variant="caption">TIEMPO</Typography><Typography variant="h5">{selectedRace.time}</Typography></Paper></Box>
        {selectedRace.top3?.length > 0 && <Box sx={{ mt: 3 }}><Typography sx={{ fontWeight: 900, mb: 1 }}>TOP 3</Typography>{selectedRace.top3.map((driver, index) => <Typography key={driver.name}>{index + 1}. {driver.name}</Typography>)}</Box>}
      </MotionBox>
    </MotionBox>}</AnimatePresence>
  </Box>;
}

export default Resultados;
