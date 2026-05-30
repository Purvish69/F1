import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { drivers, raceResults, seasonKpis, sourceLinks, teams } from '../data/f1Data.js';

const MotionBox = motion(Box);

function Hero() {
  const leader = drivers[0];
  const leadingTeam = teams[0];
  const lastRace = raceResults.at(-1);

  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        pt: { xs: 12, md: 15 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
        background:
          'radial-gradient(circle at 72% 25%, rgba(232,0,45,.28), transparent 30rem), radial-gradient(circle at 12% 8%, rgba(255,215,0,.12), transparent 24rem), #050505'
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          inset: 0,
          opacity: .16,
          position: 'absolute',
          backgroundImage:
            'linear-gradient(45deg, rgba(255,255,255,.18) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,.12) 25%, transparent 25%)',
          backgroundSize: '26px 26px'
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6.2}>
            <MotionBox initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                <Chip icon={<SpeedIcon />} color="primary" label="Temporada 2026 en vivo" />
                <Chip icon={<EmojiEventsIcon />} label={`${leader.name} lidera con ${leader.points} pts`} variant="outlined" />
              </Stack>
              <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '.24em' }}>
                FIA Formula One World Championship
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '5rem', sm: '7rem', md: '10rem', lg: '12rem' },
                  lineHeight: .78,
                  mt: 1,
                  textShadow: '0 0 54px rgba(232,0,45,.32)'
                }}
              >
                F1 DATA
                <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                  GARAGE
                </Box>
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: { xs: 18, md: 22 }, maxWidth: 720, mt: 3 }}>
                Portal premium con pilotos, equipos, coches reales, clasificaciones y resultados oficiales actualizados de 2026.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                <Button href="#pilotos" size="large" variant="contained" endIcon={<ArrowForwardIcon />}>
                  Explorar pilotos
                </Button>
                <Button href={sourceLinks.results} target="_blank" rel="noreferrer" size="large" variant="outlined">
                  Fuente oficial F1
                </Button>
              </Stack>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={5.8}>
            <MotionBox initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid rgba(255,255,255,.14)',
                  overflow: 'hidden',
                  p: { xs: 2, md: 3 },
                  position: 'relative'
                }}
              >
                {/* Logica de seccion: hero combina el coche lider y el estado real de la temporada. */}
                <Box
                  component="img"
                  src={leadingTeam.car}
                  alt="Mercedes 2026 F1 car"
                  sx={{ filter: 'drop-shadow(0 24px 52px rgba(0,210,190,.24))', mx: 'auto', width: '100%' }}
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {seasonKpis.map((kpi) => (
                    <Grid item xs={6} key={kpi.label}>
                      <Paper variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,.04)', p: 2 }}>
                        <Typography variant="h4" sx={{ color: 'common.white', lineHeight: .9 }}>
                          {kpi.value}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>{kpi.label}</Typography>
                        <Typography variant="caption" sx={{ color: 'secondary.main' }}>{kpi.detail}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Paper
                  variant="outlined"
                  sx={{
                    bgcolor: 'rgba(232,0,45,.12)',
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'space-between',
                    mt: 2,
                    p: 2
                  }}
                >
                  <Typography sx={{ fontWeight: 800 }}>Última carrera: {lastRace.grandPrix}</Typography>
                  <Typography sx={{ color: 'secondary.main', fontWeight: 800 }}>{lastRace.winner}</Typography>
                </Paper>
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;
