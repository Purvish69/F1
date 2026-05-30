import { useMemo } from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import EquipoCard from './EquipoCard.jsx';
import { drivers, sourceLinks, teams } from '../data/f1Data.js';

function Equipos() {
  const driverMap = useMemo(
    () => Object.fromEntries(drivers.map((driver) => [driver.name, driver])),
    []
  );

  return (
    <Box
      component="section"
      id="equipos"
      sx={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,.03), transparent), radial-gradient(circle at 10% 10%, rgba(232,0,45,.16), transparent 26rem)',
        py: { xs: 8, md: 12 }
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
            Constructores 2026
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
            Equipos
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 760 }}>
            Clasificación, coche real, puntos, pilotos, base, motor, chasis y estructura técnica de cada escudería.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {teams.map((team) => (
            <Grid item xs={12} lg={6} key={team.slug}>
              <EquipoCard team={team} driverMap={driverMap} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>
          Fuente: <Box component="a" href={sourceLinks.teams} target="_blank" rel="noreferrer" sx={{ color: 'primary.main' }}>formula1.com/en/teams</Box>
        </Typography>
      </Container>
    </Box>
  );
}

export default Equipos;
