import { useEffect, useState, useMemo } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { sourceLinks } from '../data/f1Data.js';
import { useChampionship } from '../hooks/useChampionship.js';
import { useSeason } from '../hooks/useSeason.js';
import { getDriverPortrait, getTeamVisual } from '../data/visualMetadata.js';
import { ErrorState, LoadingState } from './ApiStatus.jsx';

const MotionBox = motion(Box);
const initials = (name) =>
  name
    ? name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
    : 'F1';

const gpFlags = {
  'Australian Grand Prix': '🇦🇺',
  'Chinese Grand Prix': '🇨🇳',
  'Japanese Grand Prix': '🇯🇵',
  'Miami Grand Prix': '🇺🇸',
  'Canadian Grand Prix': '🇨🇦',
  'Monaco Grand Prix': '🇲🇨',
  'Spanish Grand Prix': '🇪🇸',
  'Barcelona Grand Prix': '🇪🇸',
  'Austrian Grand Prix': '🇦🇹',
  'British Grand Prix': '🇬🇧',
  'Hungarian Grand Prix': '🇭🇺',
  'Belgian Grand Prix': '🇧🇪',
  'Dutch Grand Prix': '🇳🇱',
  'Italian Grand Prix': '🇮🇹',
  'Azerbaijan Grand Prix': '🇦🇿',
  'Singapore Grand Prix': '🇸🇬',
  'United States Grand Prix': '🇺🇸',
  'Mexico City Grand Prix': '🇲🇽',
  'Sao Paulo Grand Prix': '🇧🇷',
  'Las Vegas Grand Prix': '🇺🇸',
  'Qatar Grand Prix': '🇶🇦',
  'Abu Dhabi Grand Prix': '🇦🇪',
  'Bahrain Grand Prix': '🇧🇭',
  'Saudi Arabian Grand Prix': '🇸🇦',
  'Emilia Romagna Grand Prix': '🇮🇹'
};

function Resultados() {
  const championship = useChampionship();
  const season = useSeason('2026', { autoRefreshInterval: 60_000 });
  const reducedMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'completed' | 'upcoming'
  const [showAllRaces, setShowAllRaces] = useState(false);
  const [selectedRace, setSelectedRace] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const races = season.data || [];
  const drivers = championship.data?.drivers || [];
  const teams = championship.data?.teams || [];

  const completedRacesCount = useMemo(() => races.filter((r) => r.hasResults).length, [races]);
  const upcomingRacesCount = useMemo(() => races.filter((r) => !r.hasResults).length, [races]);

  const filteredRaces = useMemo(() => {
    if (activeFilter === 'completed') return races.filter((r) => r.hasResults);
    if (activeFilter === 'upcoming') return races.filter((r) => !r.hasResults);
    return races;
  }, [races, activeFilter]);

  const visibleRaces = showAllRaces ? filteredRaces : filteredRaces.slice(0, 9);
  const isLoading = championship.loading || season.loading;
  const error = championship.error || season.error;

  const colorFor = (race) => {
    if (!race || !race.hasResults) return '#5E6570';
    const visual = getTeamVisual(race.teamSlug);
    return visual?.color || '#E8002D';
  };

  const portraitForDriver = (driverNumber, teamSlug, driverId) => {
    return getDriverPortrait(driverNumber, teamSlug, driverId);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      championship.refresh(true),
      season.refresh(true)
    ]);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && setSelectedRace(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Box
      component="section"
      id="resultados"
      sx={{
        background:
          'radial-gradient(circle at 10% 20%, rgba(232,0,45,.12), transparent 28rem), radial-gradient(circle at 90% 80%, rgba(255,215,0,.06), transparent 30rem), #060609',
        py: { xs: 8, md: 12 },
        position: 'relative'
      }}
    >
      <Container maxWidth="xl">
        {/* Header & Live API Status Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: 2.5,
            mb: 4.5
          }}
        >
          <Stack spacing={1}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
              RESULTADOS OFICIALES FIA
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
              Resultados 2026
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 700 }}>
              Calendario oficial y clasificación de cada Gran Premio sincronizados en tiempo real mediante la API oficial de Formula 1 (Jolpica / Ergast).
            </Typography>
          </Stack>

          {/* Live Sync Badge & Manual Refresh */}
          <div className="results-live-sync-bar">
            <div className="results-api-indicator" title="Conexión en vivo a la API oficial">
              <span className="results-pulse-dot" />
              <span className="results-api-label">API EN VIVO (AUTO-SYNC 60s)</span>
            </div>

            <button
              type="button"
              className={`results-refresh-btn ${isRefreshing ? 'is-spinning' : ''}`}
              onClick={handleManualRefresh}
              title="Actualizar datos oficiales ahora"
            >
              <SyncIcon sx={{ fontSize: 16 }} />
              <span>Actualizar</span>
            </button>
          </div>
        </Box>

        {/* Filter Tabs Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3.5 }}>
          <div className="results-filter-pill-bar" role="tablist" aria-label="Filtrar resultados por estado">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              className={`results-tab-pill ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveFilter('all');
                setShowAllRaces(false);
              }}
            >
              <span>🏁 Todas las carreras</span>
              <span className="pill-counter">{races.length}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'completed'}
              className={`results-tab-pill ${activeFilter === 'completed' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveFilter('completed');
                setShowAllRaces(false);
              }}
            >
              <span>🏆 Disputadas</span>
              <span className="pill-counter">{completedRacesCount}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'upcoming'}
              className={`results-tab-pill ${activeFilter === 'upcoming' ? 'is-active' : ''}`}
              onClick={() => {
                setActiveFilter('upcoming');
                setShowAllRaces(false);
              }}
            >
              <span>📅 Próximas Citas</span>
              <span className="pill-counter">{upcomingRacesCount}</span>
            </button>
          </div>
        </Box>

        {isLoading && <LoadingState label="Cargando resultados y clasificación en directo desde la API..." cards={6} />}
        {error && !championship.data && <ErrorState error={error} onRetry={handleManualRefresh} />}

        {!isLoading && races.length > 0 && (
          <>
            <Box
              sx={{
                display: 'grid',
                gap: 2.5,
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(3, minmax(0, 1fr))'
                }
              }}
            >
              {visibleRaces.map((race, index) => {
                const hasWinner = race.hasResults;
                const color = colorFor(race);
                const flag = gpFlags[race.grandPrix] || '🏁';

                return (
                  <Card
                    component={motion.article}
                    key={race.round}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.34,
                      delay: reducedMotion ? 0 : Math.min(index * 0.03, 0.22)
                    }}
                    className={`race-result-card ${hasWinner ? 'is-completed' : 'is-upcoming'}`}
                    style={{ '--race-color': color }}
                  >
                    <CardActionArea
                      onClick={() => setSelectedRace(race)}
                      sx={{ height: '100%', p: 2.5, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      {/* Top Bar: Round Badge, Location, Date */}
                      <div className="race-card-top-row">
                        <div className="race-round-group">
                          <span className="race-round-badge" style={{ background: hasWinner ? color : 'rgba(255,255,255,0.12)' }}>
                            R{race.round < 10 ? `0${race.round}` : race.round}
                          </span>
                          <span className="race-flag-icon">{flag}</span>
                          <span className="race-locality-text">
                            {race.circuit?.locality || 'Circuito F1'}
                          </span>
                        </div>

                        <span className="race-date-text">{race.date}</span>
                      </div>

                      {/* Grand Prix Title */}
                      <Typography variant="h4" className="race-grand-prix-title">
                        {race.grandPrix}
                      </Typography>

                      {/* Circuit Name */}
                      <div className="race-circuit-sub">
                        <LocationOnIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }} />
                        <span>{race.circuit?.name || 'Trazado Oficial 2026'}</span>
                      </div>

                      {/* Middle: Winner or Upcoming Status */}
                      {hasWinner ? (
                        <div className="race-winner-showcase">
                          <div className="winner-driver-row">
                            <Avatar
                              src={portraitForDriver(race.winnerNumber, race.teamSlug, race.winnerDriverId)}
                              alt={race.winner}
                              sx={{
                                bgcolor: color,
                                height: 50,
                                width: 50,
                                border: `2px solid ${color}`,
                                boxShadow: `0 0 14px ${color}66`,
                                '& img': { objectFit: 'cover', objectPosition: '50% 12%' }
                              }}
                            >
                              {initials(race.winner)}
                            </Avatar>
                            <div className="winner-details-col">
                              <span className="winner-kicker-label">🏆 GANADOR DEL GP</span>
                              <Typography className="winner-driver-name">{race.winner}</Typography>
                              <span className="winner-team-pill" style={{ color }}>{race.team}</span>
                            </div>
                          </div>

                          {/* Mini Podium Grid */}
                          {race.podium?.length > 1 && (
                            <div className="race-podium-mini-strip">
                              {race.podium.map((pod, pIdx) => {
                                const medals = ['🥇', '🥈', '🥉'];
                                return (
                                  <div key={pod.name} className="podium-mini-item">
                                    <span className="podium-mini-medal">{medals[pIdx]}</span>
                                    <span className="podium-mini-name">{pod.name.split(' ').at(-1)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Fastest Lap Indicator */}
                          {race.fastestLap && (
                            <div className="race-fastest-lap-badge">
                              <FlashOnIcon sx={{ fontSize: 13, color: '#ffd700' }} />
                              <span>V. Rápida: <strong>{race.fastestLap.driver.split(' ').at(-1)}</strong> ({race.fastestLap.time})</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="race-upcoming-box">
                          <CalendarMonthIcon sx={{ fontSize: 24, color: 'rgba(255,255,255,0.5)' }} />
                          <div className="upcoming-text-col">
                            <span className="upcoming-title">Próxima cita oficial</span>
                            <span className="upcoming-sub">Resultados en vivo al finalizar</span>
                          </div>
                        </div>
                      )}

                      {/* Card Bottom CTA */}
                      <div className="race-card-footer-cta">
                        <span className="card-cta-label">
                          {hasWinner ? 'Ver clasificación completa 📊' : 'Detalles del Gran Premio ›'}
                        </span>
                      </div>
                    </CardActionArea>
                  </Card>
                );
              })}
            </Box>

            {filteredRaces.length > 9 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  onClick={() => setShowAllRaces((value) => !value)}
                  variant="outlined"
                  className="results-load-more-btn"
                >
                  {showAllRaces ? 'Ver menos citas' : `Ver todas las citas (${filteredRaces.length})`}
                </Button>
              </Box>
            )}
          </>
        )}

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>
          Fuente de datos: <Box component="a" href={sourceLinks.results} target="_blank" rel="noreferrer" sx={{ color: 'primary.main' }}>api.jolpi.ca/ergast/f1/2026</Box> · Actualización automática en segundo plano.
        </Typography>
      </Container>

      {/* Full Classification Dialog Modal */}
      <AnimatePresence>
        {selectedRace && (
          <MotionBox
            aria-modal="true"
            onClick={() => setSelectedRace(null)}
            role="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            sx={{
              alignItems: 'center',
              backdropFilter: 'blur(16px)',
              background: 'rgba(0,0,0,.78)',
              display: 'flex',
              inset: 0,
              justifyContent: 'center',
              p: { xs: 1.5, sm: 3 },
              position: 'fixed',
              zIndex: 1400
            }}
          >
            <MotionBox
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeOut' }}
              className="race-modal-container"
              style={{ '--race-color': colorFor(selectedRace) }}
            >
              <IconButton
                aria-label="Cerrar resultados"
                onClick={() => setSelectedRace(null)}
                className="race-modal-close-btn"
              >
                <CloseIcon />
              </IconButton>

              {/* Modal Header */}
              <div className="race-modal-header">
                <div className="modal-top-badges">
                  <span className="modal-round-pill">RONDA {selectedRace.round}</span>
                  <span className="modal-flag-pill">{gpFlags[selectedRace.grandPrix] || '🏁'} {selectedRace.circuit?.country || 'F1'}</span>
                  <span className="modal-date-pill">{selectedRace.date}</span>
                </div>

                <Typography variant="h3" className="modal-gp-name">
                  {selectedRace.grandPrix}
                </Typography>

                <Typography className="modal-circuit-desc">
                  📍 {selectedRace.circuit?.name} · {selectedRace.circuit?.locality}, {selectedRace.circuit?.country}
                </Typography>
              </div>

              {/* Winner Header if finished */}
              {selectedRace.hasResults ? (
                <>
                  <div className="modal-winner-banner">
                    <Avatar
                      src={portraitForDriver(selectedRace.winnerNumber, selectedRace.teamSlug, selectedRace.winnerDriverId)}
                      sx={{
                        bgcolor: colorFor(selectedRace),
                        height: 60,
                        width: 60,
                        border: `2px solid ${colorFor(selectedRace)}`,
                        boxShadow: `0 0 16px ${colorFor(selectedRace)}`
                      }}
                    >
                      {initials(selectedRace.winner)}
                    </Avatar>
                    <div className="modal-winner-info">
                      <span className="modal-winner-tag">🏆 GANADOR DE LA CARRERA</span>
                      <Typography className="modal-winner-name">{selectedRace.winner}</Typography>
                      <span className="modal-winner-team" style={{ color: colorFor(selectedRace) }}>{selectedRace.team}</span>
                    </div>
                    <div className="modal-winner-time-box">
                      <span className="time-box-label">TIEMPO / VUELTAS</span>
                      <strong className="time-box-val">{selectedRace.raceTime || '58 laps'} ({selectedRace.laps} v.)</strong>
                    </div>
                  </div>

                  {/* Top 10 Classification Table */}
                  {selectedRace.top10?.length > 0 && (
                    <div className="modal-table-wrapper">
                      <Typography className="modal-table-title">TOP 10 · CLASIFICACIÓN OFICIAL</Typography>
                      <div className="modal-results-table">
                        <div className="table-header-row">
                          <span className="th-pos">POS</span>
                          <span className="th-driver">PILOTO</span>
                          <span className="th-team">EQUIPO</span>
                          <span className="th-time">TIEMPO / ESTADO</span>
                          <span className="th-pts">PTS</span>
                        </div>
                        {selectedRace.top10.map((res) => {
                          const isPodium = res.pos <= 3;
                          const medalIcons = ['🥇', '🥈', '🥉'];
                          const teamVis = getTeamVisual(res.teamSlug);
                          return (
                            <div key={res.name} className={`table-data-row ${isPodium ? `is-podium pos-${res.pos}` : ''}`}>
                              <span className="td-pos">
                                {isPodium ? medalIcons[res.pos - 1] : `P${res.pos}`}
                              </span>
                              <div className="td-driver">
                                <span className="driver-color-dot" style={{ background: teamVis?.color || '#fff' }} />
                                <strong>{res.name}</strong>
                                <span className="driver-num-code">#{res.number} {res.code}</span>
                              </div>
                              <span className="td-team" style={{ color: teamVis?.color || '#a0aec0' }}>{res.team}</span>
                              <span className="td-time">{res.time}</span>
                              <span className="td-pts">+{res.points}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="modal-upcoming-detail">
                  <CalendarMonthIcon sx={{ fontSize: 44, color: '#ffd700' }} />
                  <Typography variant="h5" sx={{ color: '#fff', mt: 1, fontWeight: 800 }}>Gran Premio por disputarse</Typography>
                  <Typography sx={{ color: '#a0aec0', fontSize: '0.85rem', mt: 0.5, maxWidth: 400, textAlign: 'center' }}>
                    Esta cita del calendario oficial 2026 se actualizará automáticamente con los resultados oficiales y tiempos por vuelta en cuanto finalice la sesión.
                  </Typography>
                </div>
              )}
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default Resultados;
