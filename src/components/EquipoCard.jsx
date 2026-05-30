import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';

function Field({ label, value }) {
  return (
    <Stack spacing={.3}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800 }}>{value}</Typography>
    </Stack>
  );
}

function EquipoCard({ team, driverMap }) {
  const teamDrivers = team.drivers.map((name) => driverMap[name]).filter(Boolean);
  const officialSlugs = {
    astonmartin: 'aston-martin',
    redbullracing: 'red-bull-racing',
    racingbulls: 'racing-bulls'
  };
  const officialSlug = officialSlugs[team.slug] || team.slug;

  return (
    <Card
      sx={{
        borderColor: `${team.color}66`,
        height: '100%',
        overflow: 'hidden',
        transition: 'transform .24s ease, box-shadow .24s ease',
        '&:hover': { boxShadow: `0 24px 80px ${team.color}32`, transform: 'translateY(-6px)' }
      }}
    >
      <Box sx={{ bgcolor: `${team.color}18`, p: 2.2, position: 'relative' }}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Chip label={`P${team.position}`} sx={{ bgcolor: team.color, color: 'common.white', fontWeight: 900 }} />
          <Chip label={`${team.points} pts`} variant="outlined" />
        </Stack>
        <Box
          component="img"
          src={team.car}
          alt={`${team.name} 2026 car`}
          loading="lazy"
          sx={{ filter: `drop-shadow(0 22px 42px ${team.color}44)`, mt: 2, width: '100%' }}
        />
      </Box>
      <CardContent sx={{ p: 2.4 }}>
        {/* Logica de seccion: cada equipo junta datos deportivos, estructura y pilotos. */}
        <Typography variant="h3" sx={{ lineHeight: .9 }}>{team.name}</Typography>
        <Typography sx={{ color: 'text.secondary', fontWeight: 800, mt: .5 }}>{team.fullName}</Typography>

        <Grid container spacing={1.5} sx={{ mt: 2 }}>
          <Grid item xs={4}><Field label="Wins" value={team.wins} /></Grid>
          <Grid item xs={4}><Field label="Podios" value={team.podiums} /></Grid>
          <Grid item xs={4}><Field label="Poles" value={team.poles} /></Grid>
        </Grid>

        <Stack spacing={1.4} sx={{ mt: 2.5 }}>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 900 }}>PUNTOS DE CONSTRUCTORES</Typography>
              <Typography variant="caption">{team.points}/219</Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(team.points / 219) * 100}
              sx={{ bgcolor: 'rgba(255,255,255,.10)', height: 8, '& .MuiLinearProgress-bar': { bgcolor: team.color } }}
            />
          </Box>
        </Stack>

        <Divider sx={{ my: 2.4 }} />
        <Grid container spacing={1.5}>
          <Grid item xs={6}><Field label="Base" value={team.base} /></Grid>
          <Grid item xs={6}><Field label="Team chief" value={team.chief} /></Grid>
          <Grid item xs={6}><Field label="Chasis" value={team.chassis} /></Grid>
          <Grid item xs={6}><Field label="Power unit" value={team.engine} /></Grid>
        </Grid>

        <Stack direction="row" spacing={1.2} sx={{ mt: 2.4 }}>
          {teamDrivers.map((driver) => (
            <Chip key={driver.id} label={`${driver.short} · ${driver.points} pts`} sx={{ borderColor: `${team.color}88` }} variant="outlined" />
          ))}
        </Stack>

        <Button
          href={`https://www.formula1.com/en/teams/${officialSlug}`}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNewIcon />}
          fullWidth
          sx={{ mt: 2.4 }}
          variant="contained"
        >
          Perfil oficial del equipo
        </Button>
      </CardContent>
    </Card>
  );
}

export default EquipoCard;
