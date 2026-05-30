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

function Stat({ label, value }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800, textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ lineHeight: 1 }}>{value}</Typography>
    </Box>
  );
}

function PilotoCard({ pilot, team }) {
  const maxPoints = 131;

  return (
    <Card
      sx={{
        borderColor: `${team.color}66`,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform .24s ease, box-shadow .24s ease',
        '&:hover': {
          boxShadow: `0 24px 70px ${team.color}38`,
          transform: 'translateY(-8px)'
        }
      }}
    >
      <Box
        sx={{
          bgcolor: `${team.color}24`,
          minHeight: 260,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'rgba(255,255,255,.08)',
            fontSize: 150,
            lineHeight: .8,
            position: 'absolute',
            right: 12,
            top: 18
          }}
        >
          {pilot.number}
        </Typography>
        <Box
          component="img"
          src={pilot.image}
          alt={pilot.name}
          loading="lazy"
          sx={{
            bottom: 0,
            height: 300,
            objectFit: 'contain',
            position: 'absolute',
            right: { xs: -18, sm: 0 },
            width: 210
          }}
        />
        <Stack spacing={1} sx={{ left: 18, position: 'absolute', top: 18 }}>
          <Chip label={`P${pilot.position}`} sx={{ bgcolor: team.color, color: 'common.white', fontWeight: 900 }} />
          <Chip label={`${pilot.flag} ${pilot.nationality}`} variant="outlined" />
        </Stack>
      </Box>

      <CardContent sx={{ p: 2.4 }}>
        {/* Logica de seccion: la ficha mezcla standings, ritmo de temporada y enlace oficial. */}
        <Typography variant="h4" sx={{ lineHeight: .9 }}>{pilot.name}</Typography>
        <Typography sx={{ color: team.color, fontWeight: 900, mt: .5 }}>{pilot.team}</Typography>
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="h3" sx={{ lineHeight: .8 }}>{pilot.points}</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 800 }}>PUNTOS</Typography>
            <LinearProgress
              variant="determinate"
              value={(pilot.points / maxPoints) * 100}
              sx={{ bgcolor: 'rgba(255,255,255,.10)', '& .MuiLinearProgress-bar': { bgcolor: team.color } }}
            />
          </Box>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={1.5}>
          <Grid item xs={4}><Stat label="Wins" value={pilot.wins} /></Grid>
          <Grid item xs={4}><Stat label="Podios" value={pilot.podiums} /></Grid>
          <Grid item xs={4}><Stat label="Poles" value={pilot.poles} /></Grid>
          <Grid item xs={4}><Stat label="Top 10" value={pilot.top10} /></Grid>
          <Grid item xs={4}><Stat label="Sprint pts" value={pilot.sprintPoints} /></Grid>
          <Grid item xs={4}><Stat label="DNF" value={pilot.dnfs} /></Grid>
        </Grid>
        <Button
          fullWidth
          href={`https://www.formula1.com/en/drivers/${pilot.slug}`}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNewIcon />}
          sx={{ color: 'common.white', mt: 2.5, borderColor: `${team.color}88` }}
          variant="outlined"
        >
          Perfil oficial
        </Button>
      </CardContent>
    </Card>
  );
}

export default PilotoCard;
