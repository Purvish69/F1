import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { drivers, raceResults, sourceLinks, teams } from '../data/f1Data.js';

function Resultados() {
  return (
    <Box component="section" id="resultados" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 900, letterSpacing: '.18em' }}>
            Resultados oficiales
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 56, md: 92 }, lineHeight: .85 }}>
            Resultados 2026
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 780 }}>
            Estado de temporada con ganadores de carrera y tablas compactas de clasificación de pilotos y constructores.
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          <Grid item xs={12} lg={7}>
            <TableContainer component={Paper} sx={{ overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ronda</TableCell>
                    <TableCell>Gran Premio</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Ganador</TableCell>
                    <TableCell>Equipo</TableCell>
                    <TableCell align="right">Vueltas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {raceResults.map((race) => (
                    <TableRow key={race.round} hover>
                      <TableCell>
                        <Chip label={`R${race.round}`} size="small" color="primary" />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 900 }}>{race.grandPrix}</TableCell>
                      <TableCell>{race.date}</TableCell>
                      <TableCell>{race.winner} <Typography component="span" sx={{ color: 'text.secondary' }}>{race.code}</Typography></TableCell>
                      <TableCell>{race.team}</TableCell>
                      <TableCell align="right">{race.laps}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6} lg={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h4">Top pilotos</Typography>
                    <Stack spacing={1.2} sx={{ mt: 2 }}>
                      {drivers.slice(0, 6).map((driver) => (
                        <Stack direction="row" alignItems="center" justifyContent="space-between" key={driver.id}>
                          <Stack direction="row" spacing={1.2} alignItems="center">
                            <Chip label={driver.position} size="small" />
                            <Typography sx={{ fontWeight: 900 }}>{driver.name}</Typography>
                          </Stack>
                          <Typography sx={{ color: 'secondary.main', fontWeight: 900 }}>{driver.points}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h4">Constructores</Typography>
                    <Stack spacing={1.2} sx={{ mt: 2 }}>
                      {teams.slice(0, 6).map((team) => (
                        <Stack direction="row" alignItems="center" justifyContent="space-between" key={team.slug}>
                          <Stack direction="row" spacing={1.2} alignItems="center">
                            <Box sx={{ bgcolor: team.color, borderRadius: 999, height: 12, width: 12 }} />
                            <Typography sx={{ fontWeight: 900 }}>{team.name}</Typography>
                          </Stack>
                          <Typography sx={{ color: 'secondary.main', fontWeight: 900 }}>{team.points}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 3 }}>
          Fuente: <Box component="a" href={sourceLinks.results} target="_blank" rel="noreferrer" sx={{ color: 'primary.main' }}>formula1.com/en/results/2026/races</Box>
        </Typography>
      </Container>
    </Box>
  );
}

export default Resultados;
