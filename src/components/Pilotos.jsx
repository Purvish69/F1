import { useMemo, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Container,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography
} from '@mui/material';
import PilotoCard from './PilotoCard.jsx';
import { sourceLinks } from '../data/f1Data.js';
import { useChampionship } from '../hooks/useChampionship.js';
import { getDriverPortrait, getTeamVisual } from '../data/visualMetadata.js';
import { ErrorState, LoadingState } from './ApiStatus.jsx';

const EMPTY_LIST = [];
const visibleSurnames = new Set(['norris', 'piastri', 'leclerc', 'hamilton', 'russell', 'antonelli', 'verstappen', 'hadjar', 'alonso', 'stroll', 'sainz', 'albon', 'ocon', 'bearman', 'hulkenberg', 'bortoleto', 'gasly', 'colapinto', 'perez', 'bottas', 'lawson', 'lindblad']);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function Pilotos() {
  const [teamFilter, setTeamFilter] = useState('all');
  const { data, loading, error, refresh } = useChampionship();
  const drivers = data?.drivers ?? EMPTY_LIST;
  const teams = data?.teams ?? EMPTY_LIST;

  const filteredDrivers = useMemo(
    () => drivers.filter((driver) => visibleSurnames.has(normalize(driver.name).split(' ').at(-1)) && (teamFilter === 'all' || driver.teamSlug === teamFilter)),
    [teamFilter, drivers]
  );

  const teamBySlug = useMemo(
    () => Object.fromEntries(teams.map((team) => [team.slug, { ...team, ...getTeamVisual(team.slug) }])),
    [teams]
  );

  const driverCountsByTeam = useMemo(() => {
    const counts = { all: drivers.filter((d) => visibleSurnames.has(normalize(d.name).split(' ').at(-1))).length };
    drivers.forEach((driver) => {
      if (visibleSurnames.has(normalize(driver.name).split(' ').at(-1))) {
        counts[driver.teamSlug] = (counts[driver.teamSlug] || 0) + 1;
      }
    });
    return counts;
  }, [drivers]);

  const activeVisual = teamFilter !== 'all' ? getTeamVisual(teamFilter) : null;
  const activeColor = activeVisual?.color || '#E8002D';

  return (
    <Box component="section" id="pilotos" sx={{ background: 'radial-gradient(circle at 8% 26%, rgba(232,0,45,.14), transparent 26rem), radial-gradient(circle at 90% 72%, rgba(255,255,255,.055), transparent 30rem), #070708', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Box sx={{ alignItems: { xs: 'stretch', md: 'end' }, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto' }, mb: 4 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
              Clasificación oficial 2026
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
              Pilotos
            </Typography>
          </Box>

          <div
            className={`pilot-filter-glass-capsule ${teamFilter !== 'all' ? 'has-filter' : ''}`}
            style={{ '--active-filter-color': activeColor, '--active-filter-glow': activeColor }}
          >
            <div className="filter-badge-icon">
              <FilterAltIcon sx={{ fontSize: 18 }} />
            </div>

            <div className="filter-select-wrapper">
              <span className="filter-mini-label">FILTRAR ESCUDERÍA</span>
              <Select
                value={teamFilter}
                onChange={(event) => setTeamFilter(event.target.value)}
                variant="standard"
                disableUnderline
                displayEmpty
                className="pilot-team-custom-select"
                renderValue={(selected) => {
                  if (selected === 'all') {
                    return (
                      <div className="select-val-row">
                        <span className="select-val-dot all-dot" />
                        <span className="select-val-name">Todos los equipos</span>
                        <span className="select-val-count">{driverCountsByTeam.all || filteredDrivers.length}</span>
                      </div>
                    );
                  }
                  const currentTeam = teams.find((t) => t.slug === selected);
                  const color = getTeamVisual(selected)?.color || '#E8002D';
                  return (
                    <div className="select-val-row">
                      <span className="select-val-dot" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                      <span className="select-val-name">{currentTeam ? currentTeam.name : selected}</span>
                      <span className="select-val-count">{driverCountsByTeam[selected] || 0}</span>
                    </div>
                  );
                }}
                MenuProps={{
                  PaperProps: {
                    className: 'f1-select-popover-menu',
                    sx: {
                      background: 'rgba(8, 8, 14, 0.96) !important',
                      backdropFilter: 'blur(30px) saturate(200%)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '16px',
                      boxShadow: '0 24px 60px rgba(0, 0, 0, 0.88), 0 0 35px rgba(232, 0, 45, 0.18)',
                      mt: 1,
                      maxHeight: 380,
                      p: 0.8
                    }
                  }
                }}
              >
                <MenuItem value="all" className="f1-select-menu-item">
                  <div className="menu-item-row">
                    <span className="menu-item-color-indicator all-teams-gradient" />
                    <div className="menu-item-text-group">
                      <span className="menu-item-name">Todos los equipos</span>
                      <span className="menu-item-sub">Parrilla completa 2026</span>
                    </div>
                    <span className="menu-item-badge">{driverCountsByTeam.all || drivers.length}</span>
                    {teamFilter === 'all' && <span className="menu-item-check">✓</span>}
                  </div>
                </MenuItem>

                {teams.map((team) => {
                  const visual = getTeamVisual(team.slug);
                  const isSelected = teamFilter === team.slug;
                  const count = driverCountsByTeam[team.slug] || 0;
                  return (
                    <MenuItem
                      key={team.slug}
                      value={team.slug}
                      className={`f1-select-menu-item ${isSelected ? 'is-selected' : ''}`}
                      style={{ '--item-team-color': visual?.color || '#E8002D' }}
                    >
                      <div className="menu-item-row">
                        <span
                          className="menu-item-color-indicator"
                          style={{ background: visual?.color || '#E8002D', boxShadow: `0 0 8px ${visual?.color || '#E8002D'}` }}
                        />
                        <div className="menu-item-text-group">
                          <span className="menu-item-name">{team.name}</span>
                          <span className="menu-item-sub">{team.fullName || 'Equipo F1 2026'}</span>
                        </div>
                        <span className="menu-item-badge">{count}</span>
                        {isSelected && (
                          <span className="menu-item-check" style={{ color: visual?.color || '#E8002D' }}>
                            ✓
                          </span>
                        )}
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            {teamFilter !== 'all' && (
              <button
                type="button"
                className="filter-clear-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setTeamFilter('all');
                }}
                title="Restablecer a todos los equipos"
              >
                ✕
              </button>
            )}
          </div>
        </Box>

        {loading && <LoadingState label="Cargando pilotos..." cards={4} />}
        {error && !data && <ErrorState error={error} onRetry={refresh} />}
        {!loading && !error && <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {filteredDrivers.map((pilot, index) => <PilotoCard key={pilot.id} index={index} pilot={{ ...pilot, image: getDriverPortrait(pilot.number, pilot.teamSlug, pilot.id) }} team={teamBySlug[pilot.teamSlug] || getTeamVisual(pilot.teamSlug)} maxPoints={drivers[0]?.points || 1} />)}
        </Box>}

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>
          Fuente: <Box component="a" href={sourceLinks.drivers} target="_blank" rel="noreferrer" sx={{ color: 'primary.main' }}>formula1.com/en/drivers</Box>
        </Typography>
      </Container>
    </Box>
  );
}

export default Pilotos;
