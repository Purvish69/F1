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
          <Paper sx={{
              backdropFilter: 'blur(18px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,.13), rgba(255,255,255,.045))',
              border: '1px solid rgba(255,255,255,.18)',
              boxShadow: 'inset 0 1px rgba(255,255,255,.22)',
              p: 1.2
            }}><Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
              <FilterAltIcon color="primary" />
              <Select
                value={teamFilter}
                onChange={(event) => setTeamFilter(event.target.value)}
                size="small"
                sx={{
                  minWidth: 220,
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.16)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.32)' }
                }}
              >
                <MenuItem value="all">Todos los equipos</MenuItem>
                {teams.map((team) => (
                  <MenuItem key={team.slug} value={team.slug}>{team.name}</MenuItem>
                ))}
              </Select>
            </Stack></Paper>
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
