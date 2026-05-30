import { useMemo, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography
} from '@mui/material';
import PilotoCard from './PilotoCard.jsx';
import { drivers, sourceLinks, teams } from '../data/f1Data.js';

function Pilotos() {
  const [teamFilter, setTeamFilter] = useState('all');

  const filteredDrivers = useMemo(
    () => teamFilter === 'all' ? drivers : drivers.filter((driver) => driver.teamSlug === teamFilter),
    [teamFilter]
  );

  const teamBySlug = useMemo(
    () => Object.fromEntries(teams.map((team) => [team.slug, team])),
    []
  );

  return (
    <Box component="section" id="pilotos" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
              Clasificación oficial 2026
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
              Pilotos
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 760 }}>
              Datos de standings, puntos y rendimiento basados en la página oficial de pilotos y resultados de Formula 1.
            </Typography>
          </Box>
          <Paper
            sx={{
              alignSelf: { xs: 'stretch', md: 'flex-end' },
              backdropFilter: 'blur(18px)',
              bgcolor: 'rgba(255,255,255,.055)',
              border: '1px solid rgba(255,255,255,.12)',
              p: 1.2
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
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
            </Stack>
          </Paper>
        </Stack>

        <Grid container spacing={2.5}>
          {filteredDrivers.map((pilot) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={pilot.id}>
              <PilotoCard pilot={pilot} team={teamBySlug[pilot.teamSlug]} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>
          Fuente: <Box component="a" href={sourceLinks.drivers} target="_blank" rel="noreferrer" sx={{ color: 'primary.main' }}>formula1.com/en/drivers</Box>
        </Typography>
      </Container>
    </Box>
  );
}

export default Pilotos;
